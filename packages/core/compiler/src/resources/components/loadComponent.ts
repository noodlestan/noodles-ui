import {
    ComponentContext,
    ComponentEntity,
    ComponentEntityProps,
    ComponentImportEntity,
    ComponentOwnEntity,
} from '@noodles-ui/core-entities';
import {
    ComponentExtendResource,
    ComponentImportResource,
    ComponentOwnResource,
    ComponentResource,
    MixinResource,
    getResourceTypedKey,
} from '@noodles-ui/core-resources';

import { newResourceContextWithConsumer } from '../../context/newResourceContextWithConsumer';
import { CompilerContext } from '../../types';

import { getRenderedPart } from './getters/getRenderedPart';
import { isComponentExtendResource } from './getters/isComponentExtendResource';
import { isComponentImportResource } from './getters/isComponentImportResource';
import { isComponentOwnResource } from './getters/isComponentOwnResource';
import { addComponent } from './private/addComponent';
import { extendComponent } from './private/extendComponent';
import { extendRenderedComponent } from './private/extendRenderedComponent';
import { loadComponentMixin } from './private/loadComponentMixin';
import { loadComponentProps } from './private/loadComponentProps';

const loadRenderedComponent = (
    compiler: CompilerContext,
    context: ComponentContext,
    parent: ComponentResource,
): ComponentImportEntity | undefined => {
    const newContext = newResourceContextWithConsumer<ComponentResource>(context, parent);
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    return loadComponent(compiler, newContext) as ComponentImportEntity;
};

const loadParentComponent = (
    compiler: CompilerContext,
    context: ComponentContext,
    parent: ComponentResource,
): ComponentEntity | undefined => {
    const newContext = newResourceContextWithConsumer<ComponentResource>(context, parent);
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    return loadComponent(compiler, newContext);
};

const loadOwnComponent = (
    compiler: CompilerContext,
    context: ComponentContext,
    component: ComponentOwnResource,
): ComponentOwnEntity | undefined => {
    if (component.exposes) {
        compiler.addError(
            component,
            'The "exposes" property is ignored in components that do not extend other components.',
        );
    }
    if (component.hides) {
        compiler.addError(
            component,
            'The "hides" property is ignored in components that do not extend other components.',
        );
    }
    if (component.overrides) {
        compiler.addError(
            component,
            'The "overrides" property is ignored in components that do not extend other components.',
        );
    }
    if (component.replaces) {
        compiler.addError(
            component,
            'The "replaces" property is ignored in components that do not extend other components.',
        );
    }

    const actualProps = context.public
        ? loadComponentProps(compiler, context, component, component.props || {})
        : (component.props as ComponentEntityProps);

    const actualMixins: MixinResource[] =
        (component.use
            ?.map(mixin => loadComponentMixin(compiler, context, component, mixin))
            .filter(Boolean) as MixinResource[]) || [];

    const entity = {
        ...structuredClone(component),
        props: actualProps,
        use: actualMixins,
        vars: component.vars || {},
    };

    return addComponent(compiler, context, entity) as ComponentOwnEntity;
};

const loadComponentRenders = (
    compiler: CompilerContext,
    context: ComponentContext,
    component: ComponentOwnResource,
): ComponentOwnEntity | undefined => {
    const { from: parent, name } = component.render;
    const loadedParent = loadRenderedComponent(compiler, context, parent);
    if (!loadedParent) {
        compiler.addError(
            component,
            'Could not extend component because resolution of rendered component failed.',
        );
        return;
    }
    const part = getRenderedPart(component, loadedParent);
    if (!part) {
        compiler.addError(
            component,
            `Could not extend rendered component because could not resolve part "${name}".`,
        );
        return;
    }
    const extended = extendRenderedComponent(compiler, context, component, part);
    if (extended) {
        context.consumes.add(getResourceTypedKey(parent));
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        return loadOwnComponent(compiler, context, extended);
    }
};

const loadComponentExtend = (
    compiler: CompilerContext,
    context: ComponentContext,
    component: ComponentExtendResource,
): ComponentOwnEntity | undefined => {
    const loadedParent = loadParentComponent(
        compiler,
        context,
        component.extend,
    ) as ComponentOwnEntity;
    if (!loadedParent) {
        compiler.addError(
            component,
            'Could not extend component because resolution of extended component failed.',
        );
        return;
    }
    const extended = extendComponent(compiler, context, component, loadedParent);
    if (extended) {
        context.consumes.add(getResourceTypedKey(loadedParent));
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        return loadOwnComponent(compiler, context, extended);
    }
};

const loadComponentImport = (
    compiler: CompilerContext,
    context: ComponentContext,
    component: ComponentImportResource,
): ComponentImportEntity | undefined => {
    const entity = structuredClone(component) as ComponentImportEntity;

    return addComponent(compiler, context, entity) as ComponentImportEntity;
};

export const loadComponent = (
    compiler: CompilerContext,
    context: ComponentContext,
): ComponentEntity | undefined => {
    const { resource } = context;

    const component = isComponentOwnResource(resource);
    if (component) {
        return loadComponentRenders(compiler, context, component);
    }

    const componentExtend = isComponentExtendResource(resource);
    if (componentExtend) {
        return loadComponentExtend(compiler, context, componentExtend);
    }

    const componentImport = isComponentImportResource(resource);
    if (componentImport) {
        return loadComponentImport(compiler, context, componentImport);
    }

    throw new Error('Type error: could not match component resource by shape');
};

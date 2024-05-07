import {
    ComponentContext,
    ComponentEntity,
    ComponentEntityProps,
    ComponentImportEntity,
    ComponentRenderEntity,
} from '@noodles-ui/core-entities';
import {
    ComponentExtendResource,
    ComponentImportResource,
    ComponentRenderResource,
    ComponentResource,
    MixinResource,
    getComponentRenderedPart,
    getResourceKey,
    getResourceTypedKey,
    isComponentExtendResource,
    isComponentImportResource,
    isComponentRenderResource,
} from '@noodles-ui/core-resources';

import { newResourceContextWithConsumer } from '../../context/newResourceContextWithConsumer';
import { CompilerContext } from '../../types';

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
    component: ComponentRenderResource,
): ComponentRenderEntity | undefined => {
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

    const actualProps =
        context.public && compiler.project.system
            ? loadComponentProps(compiler, context, component, component.props || {})
            : (component.props as ComponentEntityProps);

    const actualMixins: MixinResource[] =
        (component.use
            ?.map(mixin => loadComponentMixin(compiler, context, component, mixin))
            .filter(Boolean) as MixinResource[]) || [];

    const entity: ComponentRenderEntity = {
        ...structuredClone(component),
        props: actualProps,
        use: actualMixins,
        vars: component.vars || {},
    };

    return addComponent(compiler, context, entity) as ComponentRenderEntity;
};

const loadComponentRenders = (
    compiler: CompilerContext,
    context: ComponentContext,
    component: ComponentRenderResource,
): ComponentRenderEntity | undefined => {
    const { from: parent } = component.render;
    const renderedComponent = loadRenderedComponent(compiler, context, parent);
    if (!renderedComponent) {
        const name = getResourceKey(parent);
        compiler.addError(
            component,
            `Could not extend component because resolution of rendered component "${name}" failed.`,
        );
        return;
    }
    context.consumes.add(getResourceTypedKey(renderedComponent));

    const part = getComponentRenderedPart(component, renderedComponent);
    if (!part) {
        compiler.addError(
            component,
            `Could not extend rendered component because could not resolve part "${component.render.name}".`,
        );
        return;
    }
    const entity = extendRenderedComponent(compiler, context, component, part);

    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    return loadOwnComponent(compiler, context, entity);
};

const loadComponentExtend = (
    compiler: CompilerContext,
    context: ComponentContext,
    component: ComponentExtendResource,
): ComponentRenderEntity | undefined => {
    const extendedComponent = loadParentComponent(
        compiler,
        context,
        component.extend,
    ) as ComponentRenderEntity;
    if (!extendedComponent) {
        compiler.addError(
            component,
            'Could not extend component because resolution of extended component failed.',
        );
        return;
    }
    const extended = extendComponent(compiler, context, component, extendedComponent);
    if (extended) {
        context.consumes.add(getResourceTypedKey(extendedComponent));
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

    const component = isComponentRenderResource(resource);
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

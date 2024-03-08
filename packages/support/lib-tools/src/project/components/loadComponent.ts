import {
    ComponentExtendResource,
    ComponentImportInstance,
    ComponentImportResource,
    ComponentInstance,
    ComponentOwnInstance,
    ComponentOwnResource,
    ComponentResource,
} from '@noodles-ui/core-types';

import { ComponentContext, ProjectContext } from '../../types/projects';
import { newContextResourceWithConsumer } from '../context/newContextResourceWithConsumer';
import { getResourceTypedKey } from '../resources/getResourceTypedKey';

import { addComponent } from './addComponent';
import { extendComponent } from './extend/extendComponent';
import { extendRenderedComponent } from './extend/extendRenderedComponent';
import { isComponentExtendResource } from './extend/isComponentExtendResource';
import { isComponentImportResource } from './extend/isComponentImportResource';
import { isComponentRendersResource } from './extend/isComponentRendersResource';
import { getRenderedPart } from './extend/private/getRenderedPart';
import { loadComponentProps } from './props/loadComponentProps';

const loadRenderedComponent = (
    project: ProjectContext,
    context: ComponentContext,
    parent: ComponentResource,
    component: ComponentResource,
): ComponentImportInstance | undefined => {
    const newContext = newContextResourceWithConsumer<ComponentResource, ComponentInstance>(
        context,
        parent,
        component,
    );
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    return loadComponent(project, newContext) as ComponentImportInstance;
};

const loadParentComponent = (
    project: ProjectContext,
    context: ComponentContext,
    parent: ComponentResource,
    component: ComponentResource,
): ComponentOwnInstance | undefined => {
    const newContext = newContextResourceWithConsumer<ComponentResource, ComponentInstance>(
        context,
        parent,
        component,
    );
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    return loadComponent(project, newContext) as ComponentOwnInstance;
};

const loadOwnComponent = (
    project: ProjectContext,
    context: ComponentContext,
    component: ComponentOwnResource,
): ComponentOwnInstance | undefined => {
    if (component.exposes) {
        project.addDiagnostic(
            component,
            'The "exposes" property is ignored in components that do not extend other components.',
        );
    }
    if (component.hides) {
        project.addDiagnostic(
            component,
            'The "hides" property is ignored in components that do not extend other components.',
        );
    }
    if (component.overrides) {
        project.addDiagnostic(
            component,
            'The "overrides" property is ignored in components that do not extend other components.',
        );
    }
    if (component.replaces) {
        project.addDiagnostic(
            component,
            'The "replaces" property is ignored in components that do not extend other components.',
        );
    }

    const instance = structuredClone(component) as ComponentOwnInstance;

    if (context.public) {
        const { props = {} } = instance;
        instance.props = loadComponentProps(project, context, component, props);
        // TODO also go through instance.uses and load mixins
    }

    return addComponent(project, { ...context, instance }) as ComponentOwnInstance;
};

const loadComponentRenders = (
    project: ProjectContext,
    context: ComponentContext,
    component: ComponentOwnResource,
): ComponentOwnInstance | undefined => {
    const { from: parent, name } = component.render;
    const loadedParent = loadRenderedComponent(project, context, parent, component);
    if (!loadedParent) {
        project.addDiagnostic(
            component,
            'Could not extend component because resolution of rendered component failed.',
        );
        return;
    }
    const part = getRenderedPart(project, context, component, loadedParent);
    if (!part) {
        project.addDiagnostic(
            component,
            `Could not extend rendered component because could not resolve part "${name}".`,
        );
        return;
    }
    const extended = extendRenderedComponent(project, context, component, part);
    if (extended) {
        context.consumes.add(getResourceTypedKey(parent));
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        return loadOwnComponent(project, context, extended);
    }
};

const loadComponentExtend = (
    project: ProjectContext,
    context: ComponentContext,
    component: ComponentExtendResource,
): ComponentOwnInstance | undefined => {
    const loadedParent = loadParentComponent(project, context, component.extend, component);
    if (!loadedParent) {
        project.addDiagnostic(
            component,
            'Could not extend component because resolution of extended component failed.',
        );
        return;
    }
    const extended = extendComponent(project, context, component, loadedParent);
    if (extended) {
        context.consumes.add(getResourceTypedKey(loadedParent));
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        return loadOwnComponent(project, context, extended);
    }
};

const loadComponentImport = (
    project: ProjectContext,
    context: ComponentContext,
    component: ComponentImportResource,
): ComponentImportInstance | undefined => {
    const instance = structuredClone(component) as ComponentImportInstance;

    return addComponent(project, { ...context, instance }) as ComponentImportInstance;
};

export const loadComponent = (
    project: ProjectContext,
    context: ComponentContext,
): ComponentInstance | undefined => {
    const { resource } = context;

    const componentRenders = isComponentRendersResource(resource);
    if (componentRenders) {
        return loadComponentRenders(project, context, componentRenders);
    }

    const componentExtend = isComponentExtendResource(resource);
    if (componentExtend) {
        return loadComponentExtend(project, context, componentExtend);
    }

    const componentImport = isComponentImportResource(resource);
    if (componentImport) {
        return loadComponentImport(project, context, componentImport);
    }

    throw new Error('Type error: could not match component resource by shape');
};

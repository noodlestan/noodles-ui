import {
    ComponentEntity,
    ComponentExtendResource,
    ComponentImportEntity,
    ComponentImportResource,
    ComponentOwnEntity,
    ComponentOwnResource,
    ComponentResource,
} from '@noodles-ui/core-types';
import { ComponentContext, ProjectContext } from '@noodles-ui/support-types';

import { newResourceContextWithConsumer } from '../context/newResourceContextWithConsumer';
import { getResourceTypedKey } from '../resources/getResourceTypedKey';

import { addComponent } from './addComponent';
import { extendComponent } from './extend/extendComponent';
import { extendRenderedComponent } from './extend/extendRenderedComponent';
import { isComponentExtendResource } from './extend/isComponentExtendResource';
import { isComponentImportResource } from './extend/isComponentImportResource';
import { isComponentOwnResource } from './extend/isComponentOwnResource';
import { getRenderedPart } from './extend/private/getRenderedPart';
import { loadComponentProps } from './props/loadComponentProps';

const loadRenderedComponent = (
    project: ProjectContext,
    context: ComponentContext,
    parent: ComponentResource,
): ComponentImportEntity | undefined => {
    const newContext = newResourceContextWithConsumer<ComponentResource>(context, parent);
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    return loadComponent(project, newContext) as ComponentImportEntity;
};

const loadParentComponent = (
    project: ProjectContext,
    context: ComponentContext,
    parent: ComponentResource,
): ComponentOwnEntity | undefined => {
    const newContext = newResourceContextWithConsumer<ComponentResource>(context, parent);
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    return loadComponent(project, newContext) as ComponentOwnEntity;
};

const loadOwnComponent = (
    project: ProjectContext,
    context: ComponentContext,
    component: ComponentOwnResource,
): ComponentOwnEntity | undefined => {
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

    const entity = structuredClone(component) as ComponentOwnEntity;

    if (context.public) {
        const { props = {} } = entity;
        entity.props = loadComponentProps(project, context, component, props);
        // TODO also go through entity.uses and load mixins
    }

    return addComponent(project, context, entity) as ComponentOwnEntity;
};

const loadComponentRenders = (
    project: ProjectContext,
    context: ComponentContext,
    component: ComponentOwnResource,
): ComponentOwnEntity | undefined => {
    const { from: parent, name } = component.render;
    const loadedParent = loadRenderedComponent(project, context, parent);
    if (!loadedParent) {
        project.addDiagnostic(
            component,
            'Could not extend component because resolution of rendered component failed.',
        );
        return;
    }
    const part = getRenderedPart(component, loadedParent);
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
): ComponentOwnEntity | undefined => {
    const loadedParent = loadParentComponent(project, context, component.extend);
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
): ComponentImportEntity | undefined => {
    const entity = structuredClone(component) as ComponentImportEntity;

    return addComponent(project, context, entity) as ComponentImportEntity;
};

export const loadComponent = (
    project: ProjectContext,
    context: ComponentContext,
): ComponentEntity | undefined => {
    const { resource } = context;

    const component = isComponentOwnResource(resource);
    if (component) {
        return loadComponentRenders(project, context, component);
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

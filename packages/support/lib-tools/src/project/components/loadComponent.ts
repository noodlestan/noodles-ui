import {
    ComponentExtendResource,
    ComponentOwnResource,
    ComponentResource,
} from '@noodles-ui/core-types';

import { ComponentContext, ProjectContext } from '../../types/projects';
import { getResourceTypedKey } from '../resources/getResourceTypedKey';

import { addComponent } from './addComponent';
import { newContextResourceWithConsumer } from './newContextResourceWithConsumer';
import { extendComponent } from './private/extendComponent';
import { isComponentExtendResource } from './private/isComponentExtendResource';
import { loadComponentProps } from './private/loadComponentProps';
import { resolveResourceParent } from './resolveResourceParent';

const loadParentComponent = (
    project: ProjectContext,
    context: ComponentContext,
    parent: ComponentResource,
    component: ComponentExtendResource,
) => {
    const newContext = newContextResourceWithConsumer<ComponentResource>(
        context,
        parent,
        component,
    );
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    loadComponent(project, newContext);
};

const loadComponentExtend = (
    project: ProjectContext,
    context: ComponentContext,
    component: ComponentExtendResource,
): void => {
    const { parent } = resolveResourceParent<ComponentResource>(component);
    loadParentComponent(project, context, parent, component);
    const extended = extendComponent(project, context, component);
    if (extended) {
        context.consumes.add(getResourceTypedKey(parent));
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        loadOwnComponent(project, context, extended);
    }
};

// TODO loadImportComponent

const loadOwnComponent = (
    project: ProjectContext,
    context: ComponentContext,
    component: ComponentOwnResource,
): void => {
    const instance = structuredClone(component);
    const { props = {} } = instance;

    // TODO go through instance.uses and load mixins
    instance.props = loadComponentProps(project, context, component, props);
    addComponent(project, { ...context, instance });
};

export const loadComponent = (project: ProjectContext, context: ComponentContext): void => {
    const { resource } = context;
    const componentExtend = isComponentExtendResource(resource);
    if (componentExtend) {
        loadComponentExtend(project, context, componentExtend);
    } else {
        loadOwnComponent(project, context, resource as ComponentOwnResource);
    }
};

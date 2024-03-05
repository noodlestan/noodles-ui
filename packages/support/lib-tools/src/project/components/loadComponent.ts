import {
    ComponentExtendResource,
    ComponentOwnResource,
    ComponentResource,
} from '@noodles-ui/core-types';

import { ComponentContext, ProjectContext } from '../../types/projects';
import { newContextResourceWithConsumer } from '../context/newContextResourceWithConsumer';
import { getResourceTypedKey } from '../resources/getResourceTypedKey';
import { resolveExtendWithParams } from '../resources/resolveExtendWithParams';

import { addComponent } from './addComponent';
import { extendComponent } from './private/extendComponent';
import { isComponentExtendResource } from './private/isComponentExtendResource';
import { loadComponentProps } from './private/loadComponentProps';

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
    const { parent } = resolveExtendWithParams<ComponentResource>(component.extend);
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

    if (context.public) {
        const { props = {} } = instance;
        instance.props = loadComponentProps(project, context, component, props);
        // TODO also go through instance.uses and load mixins
    }

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

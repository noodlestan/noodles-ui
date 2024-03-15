import { ComponentInstance, ComponentResource, ProjectResource } from '@noodles-ui/core-types';
import { ProjectContext } from '@noodles-ui/support-types';

import { newContextPublicResource } from '../context/newContextPublicResource';

import { loadComponent } from './loadComponent';

export const loadComponents = (project: ProjectContext, resource: ProjectResource): void => {
    const { components } = resource.entities;
    components.forEach(component => {
        const context = newContextPublicResource<ComponentResource, ComponentInstance>(component);
        loadComponent(project, context);
    });
};

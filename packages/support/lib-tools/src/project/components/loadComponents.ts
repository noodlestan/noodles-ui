import { ComponentInstance, ComponentResource, ProjectResource } from '@noodles-ui/core-types';
import { ProjectContext } from '@noodles-ui/support-types';

import { newContextPublicResource } from '../context/newContextPublicResource';

import { loadComponent } from './loadComponent';

export const loadComponents = (project: ProjectContext, projectResource: ProjectResource): void => {
    projectResource.components.forEach(component => {
        const context = newContextPublicResource<ComponentResource, ComponentInstance>(component);
        loadComponent(project, context);
    });
};

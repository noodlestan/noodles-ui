import { ComponentResource, ProjectResource } from '@noodles-ui/core-types';
import { ProjectContext } from '@noodles-ui/support-types';

import { newResourceContextPublic } from '../context/newResourceContextPublic';

import { loadComponent } from './loadComponent';

export const loadComponents = (project: ProjectContext, resource: ProjectResource): void => {
    const { components } = resource.entities;
    components.forEach(component => {
        const context = newResourceContextPublic<ComponentResource>(component);
        loadComponent(project, context);
    });
};

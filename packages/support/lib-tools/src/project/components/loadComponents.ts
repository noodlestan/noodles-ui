import { ProjectResource } from '@noodles-ui/core-types';

import { ProjectContext } from '../../types/projects';
import { newPublicItemContext } from '../context/newPublicItemContext';

import { loadComponent } from './loadComponent';

export const loadComponents = (project: ProjectContext, projectResource: ProjectResource): void => {
    projectResource.components.forEach(component => {
        const context = newPublicItemContext(component);
        loadComponent(project, context);
    });
};

import { ProjectResource } from '@noodles-ui/core-types';

import { logInfo } from '../../cli/logInfo';
import { ProjectContext } from '../../types/projects';
import { newPublicItemContext } from '../themes/newPublicItemContext';

import { loadComponent } from './loadComponent';

export const loadComponents = (project: ProjectContext, projectResource: ProjectResource): void => {
    logInfo('loading components...');

    projectResource.components.forEach(component => {
        const context = newPublicItemContext(component);
        loadComponent(project, context);
    });

    console.info('');
};

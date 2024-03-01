import { ProjectResource } from '@noodles-ui/core-types';

import { logInfo } from '../../cli/logInfo';
import { ProjectContext } from '../../types/projects';
import { newPublicItemContext } from '../themes/newPublicItemContext';

import { loadSurface } from './loadSurface';

export const loadSurfaces = (project: ProjectContext, projectResource: ProjectResource): void => {
    logInfo('loading surfaces...');

    projectResource.surfaces.forEach(surface => {
        const context = newPublicItemContext(surface);
        loadSurface(project, context);
    });

    console.info('');
};

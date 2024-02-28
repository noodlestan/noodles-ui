import { ProjectResource } from '@noodles-ui/core-types';

import { logInfo } from '../../cli/logInfo';
import { ProjectContext } from '../../types/projects';

import { addSurface } from './addSurface';

export const loadSurfaces = (project: ProjectContext, meta: ProjectResource): void => {
    logInfo('loading surfaces...');

    meta.surfaces.forEach(surface => {
        addSurface(project, surface, { public: true });
    });

    console.info('');
};

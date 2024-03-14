import { ProjectResource } from '@noodles-ui/core-types';
import { ProjectContext } from '@noodles-ui/support-types';

import { newContextPublicResource } from '../context/newContextPublicResource';

import { loadSurface } from './loadSurface';

export const loadSurfaces = (project: ProjectContext, projectResource: ProjectResource): void => {
    projectResource.surfaces.forEach(surface => {
        const context = newContextPublicResource(surface);
        loadSurface(project, context);
    });
};

import { ProjectResource } from '@noodles-ui/core-types';

import { ProjectContext } from '../../types/projects';
import { newPublicItemContext } from '../context/newPublicItemContext';

import { loadSurface } from './loadSurface';

export const loadSurfaces = (project: ProjectContext, projectResource: ProjectResource): void => {
    projectResource.surfaces.forEach(surface => {
        const context = newPublicItemContext(surface);
        loadSurface(project, context);
    });
};
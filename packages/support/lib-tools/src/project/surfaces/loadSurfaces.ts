import { ProjectResource } from '@noodles-ui/core-types';

import { ProjectContext } from '../../types/projects';

import { addSurface } from './addSurface';

export const loadSurfaces = (project: ProjectContext, meta: ProjectResource): void => {
    meta.surfaces.forEach(surface => {
        addSurface(surface, project, { public: true });
    });
};

import { ProjectResource } from '@noodles-ui/core-types';
import { ProjectContext } from '@noodles-ui/support-types';

import { newResourceContextPublic } from '../../context/newResourceContextPublic';

import { loadSurface } from './loadSurface';

export const loadSurfaces = (project: ProjectContext, resource: ProjectResource): void => {
    const { surfaces } = resource.entities;
    surfaces.forEach(surface => {
        const context = newResourceContextPublic(surface);
        loadSurface(project, context);
    });
};

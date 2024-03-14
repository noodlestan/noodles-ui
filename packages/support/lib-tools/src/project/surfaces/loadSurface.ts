import { ProjectContext, SurfaceContext } from '@noodles-ui/support-types';

import { addSurface } from './addSurface';

export const loadSurface = (project: ProjectContext, context: SurfaceContext): void => {
    const { resource: surface } = context;
    const instance = structuredClone(surface);
    addSurface(project, { ...context, instance });
};

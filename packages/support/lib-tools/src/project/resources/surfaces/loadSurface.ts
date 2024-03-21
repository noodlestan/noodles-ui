import { ProjectContext, SurfaceContext } from '@noodles-ui/support-types';

import { addSurface } from './private/addSurface';

export const loadSurface = (project: ProjectContext, context: SurfaceContext): void => {
    const { resource: surface } = context;
    const entity = structuredClone(surface);
    addSurface(project, context, entity);
};

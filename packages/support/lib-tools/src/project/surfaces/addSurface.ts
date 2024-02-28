import { SurfaceResource } from '@noodles-ui/core-types';

import { logError } from '../../cli/logError';
import { logMessage } from '../../cli/logMessage';
import { ProjectContext, SurfaceContext } from '../../types/projects';

export const addSurface = (
    project: ProjectContext,
    surface: SurfaceResource,
    context: Omit<SurfaceContext, 'meta'>,
): void => {
    const { items } = project.surfaces;

    if ('name' in surface && !surface.name) {
        logError('! surface name', { surface });
        return;
    }

    const key = surface.name || '';
    if (items.has(key)) {
        logError('! duplicate surface', key);
        return;
    }

    logMessage('+ surface', key);
    const item = { meta: surface, ...context };
    items.set(key, item);
};

import { logMessage } from '../../cli/logger/logMessage';
import { ProjectContext, SurfaceContext } from '../../types/projects';
import { getResourceKey } from '../resources/getResourceKey';

export const addSurface = (project: ProjectContext, context: SurfaceContext): void => {
    const { surfaces: items } = project;
    const { resource, instance: surface } = context;

    if (!surface) {
        project.addDiagnostic(resource, 'No instance generated.');
        return;
    }

    if ('name' in surface && !surface.name) {
        project.addDiagnostic(resource, 'No surface name.');
        return;
    }

    const key = getResourceKey(surface);
    if (items.has(key)) {
        project.addDiagnostic(resource, `Duplicate surface key "${key}".`);
        return;
    }

    logMessage('+ surface', key);
    items.set(key, context);
};

import { SurfaceResource } from '@noodles-ui/core-types';
import { ProjectContext, SurfaceContext } from '@noodles-ui/support-types';

import { getResourceKey } from '../../getters/getResourceKey';

export const addSurface = (
    project: ProjectContext,
    context: SurfaceContext,
    entity: SurfaceResource,
): void => {
    const { surface: items } = project.entities;
    const { resource } = context;

    if (!entity.name) {
        project.addDiagnostic(resource, 'Entity name is empty.');
        return;
    }

    const key = getResourceKey(entity);
    if (items.has(key)) {
        project.addDiagnostic(resource, `Duplicate entity key "${key}".`);
        return;
    }

    items.set(key, { context, entity });
};

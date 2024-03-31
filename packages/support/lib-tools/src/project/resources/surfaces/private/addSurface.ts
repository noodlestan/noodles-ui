import { SurfaceResource } from '@noodles-ui/core-types';
import { CompilerContext, SurfaceContext } from '@noodles-ui/support-types';

import { getResourceKey } from '../../getters/getResourceKey';

export const addSurface = (
    compiler: CompilerContext,
    context: SurfaceContext,
    entity: SurfaceResource,
): void => {
    const { surface: items } = compiler.entities;
    const { resource } = context;

    if (!entity.name) {
        compiler.addError(resource, 'Entity name is empty.');
        return;
    }

    const key = getResourceKey(entity);
    if (items.has(key)) {
        compiler.addError(resource, `Duplicate entity key "${key}".`);
        return;
    }

    items.set(key, { context, entity });
};

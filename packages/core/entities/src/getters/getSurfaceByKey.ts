import { NUI } from '../constants';
import { ProjectEntities, SurfaceBuildContext } from '../project-entities';

import { getEntityByKey } from './getEntityByKey';

export const getSurfaceByKey = (
    context: ProjectEntities | undefined,
    key: string,
): SurfaceBuildContext => {
    const entity = getEntityByKey<SurfaceBuildContext>(context, NUI.surface, key);
    if (!entity) {
        throw new Error(`Entity not found "${key}".`);
    }
    return entity;
};

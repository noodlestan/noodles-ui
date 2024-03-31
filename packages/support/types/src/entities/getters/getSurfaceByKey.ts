import { ProjectEntities } from '../../compiler';
import { NUI } from '../../constants';
import { SurfaceBuildContext } from '../types';

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

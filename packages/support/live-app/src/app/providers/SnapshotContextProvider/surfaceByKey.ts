import { BuildSnapshot, NUI, SurfaceBuildContext } from '@noodles-ui/support-types';

import { entityByKey } from './entityByKey';

export const surfaceByKey = (
    snapshot: BuildSnapshot | undefined,
    key: string,
): SurfaceBuildContext => {
    const entity = entityByKey<SurfaceBuildContext>(snapshot, NUI.surface, key);
    if (!entity) {
        throw new Error(`Entity not found "${key}".`);
    }
    return entity;
};

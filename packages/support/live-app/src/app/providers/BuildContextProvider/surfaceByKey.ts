import { BuildSnapshotDto, NUI, SurfaceBuildContextDto } from '@noodles-ui/support-types';

import { entityByKey } from './entityByKey';

export const surfaceByKey = (
    snapshot: BuildSnapshotDto | undefined,
    key: string,
): SurfaceBuildContextDto => {
    const entity = entityByKey<SurfaceBuildContextDto>(snapshot, NUI.surface, key);
    if (!entity) {
        throw new Error(`Entity not found "${key}".`);
    }
    return entity;
};

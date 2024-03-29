import { BuildSnapshotDto, MixinBuildContextDto, NUI } from '@noodles-ui/support-types';

import { entityByKey } from './entityByKey';

export const mixinByKey = (
    snapshot: BuildSnapshotDto | undefined,
    key: string,
): MixinBuildContextDto => {
    const entity = entityByKey<MixinBuildContextDto>(snapshot, NUI.mixin, key);
    if (!entity) {
        throw new Error(`Entity not found "${key}".`);
    }
    return entity;
};

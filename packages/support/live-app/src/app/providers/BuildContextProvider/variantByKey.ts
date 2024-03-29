import { BuildSnapshotDto, NUI, VariantBuildContextDto } from '@noodles-ui/support-types';

import { entityByKey } from './entityByKey';

export const variantByKey = (
    snapshot: BuildSnapshotDto | undefined,
    key: string,
): VariantBuildContextDto => {
    const entity = entityByKey<VariantBuildContextDto>(snapshot, NUI.variant, key);
    if (!entity) {
        throw new Error(`Entity not found "${key}".`);
    }
    return entity;
};

import { BuildSnapshot, NUI, VariantBuildContext } from '@noodles-ui/support-types';

import { entityByKey } from './entityByKey';

export const variantByKey = (
    snapshot: BuildSnapshot | undefined,
    key: string,
): VariantBuildContext => {
    const entity = entityByKey<VariantBuildContext>(snapshot, NUI.variant, key);
    if (!entity) {
        throw new Error(`Entity not found "${key}".`);
    }
    return entity;
};

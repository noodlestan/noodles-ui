import { BuildSnapshot, MixinBuildContext, NUI } from '@noodles-ui/support-types';

import { entityByKey } from './entityByKey';

export const mixinByKey = (snapshot: BuildSnapshot | undefined, key: string): MixinBuildContext => {
    const entity = entityByKey<MixinBuildContext>(snapshot, NUI.mixin, key);
    if (!entity) {
        throw new Error(`Entity not found "${key}".`);
    }
    return entity;
};

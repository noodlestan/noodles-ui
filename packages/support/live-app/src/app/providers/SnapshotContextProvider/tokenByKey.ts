import { BuildSnapshot, NUI, TokenBuildContext } from '@noodles-ui/support-types';

import { entityByKey } from './entityByKey';

export const tokenByKey = (snapshot: BuildSnapshot | undefined, key: string): TokenBuildContext => {
    const entity = entityByKey<TokenBuildContext>(snapshot, NUI.token, key);
    if (!entity) {
        throw new Error(`Entity not found "${key}".`);
    }
    return entity;
};

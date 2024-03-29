import { BuildSnapshotDto, NUI, TokenBuildContextDto } from '@noodles-ui/support-types';

import { entityByKey } from './entityByKey';

export const tokenByKey = (
    snapshot: BuildSnapshotDto | undefined,
    key: string,
): TokenBuildContextDto => {
    const entity = entityByKey<TokenBuildContextDto>(snapshot, NUI.token, key);
    if (!entity) {
        throw new Error(`Entity not found "${key}".`);
    }
    return entity;
};

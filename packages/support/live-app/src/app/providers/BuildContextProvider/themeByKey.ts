import { BuildSnapshotDto, NUI, ThemeBuildContextDto } from '@noodles-ui/support-types';

import { entityByKey } from './entityByKey';

export const themeByKey = (
    snapshot: BuildSnapshotDto | undefined,
    key: string,
): ThemeBuildContextDto => {
    const entity = entityByKey<ThemeBuildContextDto>(snapshot, NUI.theme, key);
    if (!entity) {
        throw new Error(`Entity not found "${key}".`);
    }
    return entity;
};

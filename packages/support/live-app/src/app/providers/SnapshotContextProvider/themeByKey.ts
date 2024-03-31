import { BuildSnapshot, NUI, ThemeBuildContext } from '@noodles-ui/support-types';

import { entityByKey } from './entityByKey';

export const themeByKey = (snapshot: BuildSnapshot | undefined, key: string): ThemeBuildContext => {
    const entity = entityByKey<ThemeBuildContext>(snapshot, NUI.theme, key);
    if (!entity) {
        throw new Error(`Entity not found "${key}".`);
    }
    return entity;
};

import { NUI } from '../constants';
import { ProjectEntities, ThemeBuildContext } from '../project-entities';

import { getEntityByKey } from './getEntityByKey';

export const getThemeByKey = (
    context: ProjectEntities | undefined,
    key: string,
): ThemeBuildContext => {
    const entity = getEntityByKey<ThemeBuildContext>(context, NUI.theme, key);
    if (!entity) {
        throw new Error(`Entity not found "${key}".`);
    }
    return entity;
};

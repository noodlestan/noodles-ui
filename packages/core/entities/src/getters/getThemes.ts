import { NUI } from '../constants';
import { ProjectEntities, ThemeBuildContext } from '../project-entities';

import { getEntitiesByType } from './getEntitiesByType';

export const getThemes = (context: ProjectEntities | undefined): ThemeBuildContext[] =>
    getEntitiesByType<ThemeBuildContext>(context, NUI.theme);

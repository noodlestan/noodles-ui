import { ProjectEntities } from '../../compiler';
import { NUI } from '../../constants';
import { ThemeBuildContext } from '../types';

import { getEntitiesByType } from './getEntitiesByType';

export const getThemes = (context: ProjectEntities | undefined): ThemeBuildContext[] =>
    getEntitiesByType<ThemeBuildContext>(context, NUI.theme);

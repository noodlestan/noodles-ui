import { BuildSnapshot, NUI, ThemeBuildContext } from '@noodles-ui/support-types';

import { entitiesByType } from './entitiesByType';

export const themes = (snapshot: BuildSnapshot | undefined): ThemeBuildContext[] =>
    entitiesByType<ThemeBuildContext>(snapshot, NUI.theme);

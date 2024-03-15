import { BuildSnapshotDto, NUI, ThemeContextWithInstance } from '@noodles-ui/support-types';

import { entitiesByType } from './entitiesByType';

export const themes = (snapshot: BuildSnapshotDto | undefined): ThemeContextWithInstance[] =>
    entitiesByType<ThemeContextWithInstance>(snapshot, NUI.theme);

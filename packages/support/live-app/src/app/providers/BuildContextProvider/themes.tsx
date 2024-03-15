import { BuildSnapshotDto, NUI, ThemeBuildContext } from '@noodles-ui/support-types';

import { entitiesByType } from './entitiesByType';

export const themes = (snapshot: BuildSnapshotDto | undefined): ThemeBuildContext[] =>
    entitiesByType<ThemeBuildContext>(snapshot, NUI.theme);

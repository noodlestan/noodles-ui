import { BuildSnapshotDto, NUI, ThemeBuildContextDto } from '@noodles-ui/support-types';

import { entitiesByType } from './entitiesByType';

export const themes = (snapshot: BuildSnapshotDto | undefined): ThemeBuildContextDto[] =>
    entitiesByType<ThemeBuildContextDto>(snapshot, NUI.theme);

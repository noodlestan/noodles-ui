import { BuildSnapshotDto, NUI, SurfaceBuildContextDto } from '@noodles-ui/support-types';

import { entitiesByType } from './entitiesByType';

export const surfaces = (snapshot?: BuildSnapshotDto): SurfaceBuildContextDto[] =>
    entitiesByType<SurfaceBuildContextDto>(snapshot, NUI.surface);

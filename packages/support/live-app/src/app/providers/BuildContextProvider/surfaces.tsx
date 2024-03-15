import { BuildSnapshotDto, NUI, SurfaceBuildContext } from '@noodles-ui/support-types';

import { entitiesByType } from './entitiesByType';

export const surfaces = (snapshot?: BuildSnapshotDto): SurfaceBuildContext[] =>
    entitiesByType<SurfaceBuildContext>(snapshot, NUI.surface);

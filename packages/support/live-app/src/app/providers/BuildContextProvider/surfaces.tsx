import { BuildSnapshotDto, NUI, SurfaceContextWithInstance } from '@noodles-ui/support-types';

import { entitiesByType } from './entitiesByType';

export const surfaces = (snapshot?: BuildSnapshotDto): SurfaceContextWithInstance[] =>
    entitiesByType<SurfaceContextWithInstance>(snapshot, NUI.surface);

import { BuildSnapshot, NUI, SurfaceBuildContext } from '@noodles-ui/support-types';

import { entitiesByType } from './entitiesByType';

export const surfaces = (snapshot?: BuildSnapshot): SurfaceBuildContext[] =>
    entitiesByType<SurfaceBuildContext>(snapshot, NUI.surface);

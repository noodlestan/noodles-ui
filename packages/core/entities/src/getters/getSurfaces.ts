import { NUI } from '../constants';
import { ProjectEntities, SurfaceBuildContext } from '../project-entities';

import { getEntitiesByType } from './getEntitiesByType';

export const getSurfaces = (context?: ProjectEntities): SurfaceBuildContext[] =>
    getEntitiesByType<SurfaceBuildContext>(context, NUI.surface);

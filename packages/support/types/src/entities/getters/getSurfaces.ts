import { ProjectEntities } from '../../compiler';
import { NUI } from '../../constants';
import { SurfaceBuildContext } from '../types';

import { getEntitiesByType } from './getEntitiesByType';

export const getSurfaces = (context?: ProjectEntities): SurfaceBuildContext[] =>
    getEntitiesByType<SurfaceBuildContext>(context, NUI.surface);

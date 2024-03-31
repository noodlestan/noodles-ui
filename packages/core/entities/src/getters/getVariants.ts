import { NUI } from '../constants';
import { ProjectEntities, VariantBuildContext } from '../project-entities';

import { getEntitiesByType } from './getEntitiesByType';

export const getVariants = (context: ProjectEntities | undefined): VariantBuildContext[] =>
    getEntitiesByType<VariantBuildContext>(context, NUI.variant);

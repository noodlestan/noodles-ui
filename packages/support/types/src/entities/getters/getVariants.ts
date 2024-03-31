import { ProjectEntities } from '../../compiler';
import { NUI } from '../../constants';
import { VariantBuildContext } from '../types';

import { getEntitiesByType } from './getEntitiesByType';

export const getVariants = (context: ProjectEntities | undefined): VariantBuildContext[] =>
    getEntitiesByType<VariantBuildContext>(context, NUI.variant);

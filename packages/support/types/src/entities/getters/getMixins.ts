import { ProjectEntities } from '../../compiler';
import { NUI } from '../../constants';
import { MixinBuildContext } from '../types';

import { getEntitiesByType } from './getEntitiesByType';

export const getMixins = (context?: ProjectEntities): MixinBuildContext[] =>
    getEntitiesByType<MixinBuildContext>(context, NUI.mixin);

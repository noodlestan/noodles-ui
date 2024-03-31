import { NUI } from '../constants';
import { MixinBuildContext, ProjectEntities } from '../project-entities';

import { getEntitiesByType } from './getEntitiesByType';

export const getMixins = (context?: ProjectEntities): MixinBuildContext[] =>
    getEntitiesByType<MixinBuildContext>(context, NUI.mixin);

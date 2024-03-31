import { BuildSnapshot, MixinBuildContext, NUI } from '@noodles-ui/support-types';

import { entitiesByType } from './entitiesByType';

export const mixins = (snapshot?: BuildSnapshot): MixinBuildContext[] =>
    entitiesByType<MixinBuildContext>(snapshot, NUI.mixin);

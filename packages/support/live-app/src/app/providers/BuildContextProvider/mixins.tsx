import { BuildSnapshotDto, MixinBuildContext, NUI } from '@noodles-ui/support-types';

import { entitiesByType } from './entitiesByType';

export const mixins = (snapshot?: BuildSnapshotDto): MixinBuildContext[] =>
    entitiesByType<MixinBuildContext>(snapshot, NUI.mixin);

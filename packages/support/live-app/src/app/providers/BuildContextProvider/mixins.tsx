import { BuildSnapshotDto, MixinBuildContextDto, NUI } from '@noodles-ui/support-types';

import { entitiesByType } from './entitiesByType';

export const mixins = (snapshot?: BuildSnapshotDto): MixinBuildContextDto[] =>
    entitiesByType<MixinBuildContextDto>(snapshot, NUI.mixin);

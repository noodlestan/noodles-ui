import { BuildSnapshotDto, NUI, VariantBuildContextDto } from '@noodles-ui/support-types';

import { entitiesByType } from './entitiesByType';

export const variants = (snapshot: BuildSnapshotDto | undefined): VariantBuildContextDto[] =>
    entitiesByType<VariantBuildContextDto>(snapshot, NUI.variant);

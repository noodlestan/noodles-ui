import { BuildSnapshotDto, NUI, VariantBuildContext } from '@noodles-ui/support-types';

import { entitiesByType } from './entitiesByType';

export const variants = (snapshot: BuildSnapshotDto | undefined): VariantBuildContext[] =>
    entitiesByType<VariantBuildContext>(snapshot, NUI.variant);

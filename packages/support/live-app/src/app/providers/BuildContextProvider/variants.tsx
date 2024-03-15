import { BuildSnapshotDto, NUI, VariantContextWithInstance } from '@noodles-ui/support-types';

import { entitiesByType } from './entitiesByType';

export const variants = (snapshot: BuildSnapshotDto | undefined): VariantContextWithInstance[] =>
    entitiesByType<VariantContextWithInstance>(snapshot, NUI.variant);

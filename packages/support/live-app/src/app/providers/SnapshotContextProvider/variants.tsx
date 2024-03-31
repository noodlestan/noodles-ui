import { BuildSnapshot, NUI, VariantBuildContext } from '@noodles-ui/support-types';

import { entitiesByType } from './entitiesByType';

export const variants = (snapshot: BuildSnapshot | undefined): VariantBuildContext[] =>
    entitiesByType<VariantBuildContext>(snapshot, NUI.variant);

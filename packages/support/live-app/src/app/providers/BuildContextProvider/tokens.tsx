import { BuildSnapshotDto, NUI, TokenBuildContext } from '@noodles-ui/support-types';

import { entitiesByType } from './entitiesByType';

export const tokens = (snapshot: BuildSnapshotDto | undefined): TokenBuildContext[] =>
    entitiesByType<TokenBuildContext>(snapshot, NUI.token);

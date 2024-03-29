import { BuildSnapshotDto, NUI, TokenBuildContextDto } from '@noodles-ui/support-types';

import { entitiesByType } from './entitiesByType';

export const tokens = (snapshot: BuildSnapshotDto | undefined): TokenBuildContextDto[] =>
    entitiesByType<TokenBuildContextDto>(snapshot, NUI.token);

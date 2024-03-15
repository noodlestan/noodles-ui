import { BuildSnapshotDto, NUI, TokenContextWithInstance } from '@noodles-ui/support-types';

import { entitiesByType } from './entitiesByType';

export const tokens = (snapshot: BuildSnapshotDto | undefined): TokenContextWithInstance[] =>
    entitiesByType<TokenContextWithInstance>(snapshot, NUI.token);

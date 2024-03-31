import { BuildSnapshot, NUI, TokenBuildContext } from '@noodles-ui/support-types';

import { entitiesByType } from './entitiesByType';

export const tokens = (snapshot: BuildSnapshot | undefined): TokenBuildContext[] =>
    entitiesByType<TokenBuildContext>(snapshot, NUI.token);

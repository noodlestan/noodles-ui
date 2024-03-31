import { NUI } from '../constants';
import { ProjectEntities, TokenBuildContext } from '../project-entities';

import { getEntitiesByType } from './getEntitiesByType';

export const getTokens = (context: ProjectEntities | undefined): TokenBuildContext[] =>
    getEntitiesByType<TokenBuildContext>(context, NUI.token);

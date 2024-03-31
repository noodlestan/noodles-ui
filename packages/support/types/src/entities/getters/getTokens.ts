import { ProjectEntities } from '../../compiler';
import { NUI } from '../../constants';
import { TokenBuildContext } from '../types';

import { getEntitiesByType } from './getEntitiesByType';

export const getTokens = (context: ProjectEntities | undefined): TokenBuildContext[] =>
    getEntitiesByType<TokenBuildContext>(context, NUI.token);

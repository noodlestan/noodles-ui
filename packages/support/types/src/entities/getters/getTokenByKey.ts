import { ProjectEntities } from '../../compiler';
import { NUI } from '../../constants';
import { TokenBuildContext } from '../types';

import { getEntityByKey } from './getEntityByKey';

export const getTokenByKey = (
    context: ProjectEntities | undefined,
    key: string,
): TokenBuildContext => {
    const entity = getEntityByKey<TokenBuildContext>(context, NUI.token, key);
    if (!entity) {
        throw new Error(`Entity not found "${key}".`);
    }
    return entity;
};

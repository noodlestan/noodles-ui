import { NUI } from '../constants';
import { ProjectEntities, TokenBuildContext } from '../project-entities';

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

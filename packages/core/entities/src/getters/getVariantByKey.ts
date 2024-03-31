import { NUI } from '../constants';
import { ProjectEntities, VariantBuildContext } from '../project-entities';

import { getEntityByKey } from './getEntityByKey';

export const getVariantByKey = (
    context: ProjectEntities | undefined,
    key: string,
): VariantBuildContext => {
    const entity = getEntityByKey<VariantBuildContext>(context, NUI.variant, key);
    if (!entity) {
        throw new Error(`Entity not found "${key}".`);
    }
    return entity;
};

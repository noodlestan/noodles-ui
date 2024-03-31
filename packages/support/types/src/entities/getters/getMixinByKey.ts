import { ProjectEntities } from '../../compiler';
import { NUI } from '../../constants';
import { MixinBuildContext } from '../types';

import { getEntityByKey } from './getEntityByKey';

export const getMixinByKey = (
    context: ProjectEntities | undefined,
    key: string,
): MixinBuildContext => {
    const entity = getEntityByKey<MixinBuildContext>(context, NUI.mixin, key);
    if (!entity) {
        throw new Error(`Entity not found "${key}".`);
    }
    return entity;
};

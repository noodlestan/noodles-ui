import { ProjectEntities } from '../../compiler';
import { NUI } from '../../constants';
import { ComponentBuildContext } from '../types';

import { getEntityByKey } from './getEntityByKey';

export const getComponentByKey = (
    context: ProjectEntities | undefined,
    key: string,
): ComponentBuildContext => {
    const entity = getEntityByKey<ComponentBuildContext>(context, NUI.component, key);
    if (!entity) {
        throw new Error(`Entity not found "${key}".`);
    }
    return entity;
};

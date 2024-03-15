import { BuildSnapshotDto, ComponentContextWithInstance, NUI } from '@noodles-ui/support-types';

import { entityByKey } from './entityByKey';

export const componentByKey = (
    snapshot: BuildSnapshotDto | undefined,
    key: string,
): ComponentContextWithInstance => {
    const entity = entityByKey<ComponentContextWithInstance>(snapshot, NUI.component, key);
    if (!entity) {
        throw new Error(`Entity not found "${key}".`);
    }
    return entity;
};

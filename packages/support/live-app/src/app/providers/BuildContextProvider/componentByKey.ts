import { BuildSnapshotDto, ComponentBuildContextDto, NUI } from '@noodles-ui/support-types';

import { entityByKey } from './entityByKey';

export const componentByKey = (
    snapshot: BuildSnapshotDto | undefined,
    key: string,
): ComponentBuildContextDto => {
    const entity = entityByKey<ComponentBuildContextDto>(snapshot, NUI.component, key);
    if (!entity) {
        throw new Error(`Entity not found "${key}".`);
    }
    return entity;
};

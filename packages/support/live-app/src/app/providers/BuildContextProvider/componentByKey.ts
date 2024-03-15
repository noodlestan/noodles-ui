import { BuildSnapshotDto, ComponentBuildContext, NUI } from '@noodles-ui/support-types';

import { entityByKey } from './entityByKey';

export const componentByKey = (
    snapshot: BuildSnapshotDto | undefined,
    key: string,
): ComponentBuildContext => {
    const entity = entityByKey<ComponentBuildContext>(snapshot, NUI.component, key);
    if (!entity) {
        throw new Error(`Entity not found "${key}".`);
    }
    return entity;
};

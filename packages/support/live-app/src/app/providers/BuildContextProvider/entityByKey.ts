import {
    BuildSnapshotDto,
    EntityType,
    ItemContextWithInstance,
    UnknownResource,
} from '@noodles-ui/support-types';

import { entitiesByType } from './entitiesByType';

export function entityByKey<T extends ItemContextWithInstance<UnknownResource>>(
    snapshot: BuildSnapshotDto | undefined,
    type: EntityType,
    key: string,
): T | undefined {
    return entitiesByType(snapshot, type).find(entity => entity.key === key) as T;
}

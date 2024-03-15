import { BuildSnapshotDto, EntityType, UnknownBuildContext } from '@noodles-ui/support-types';

import { entitiesByType } from './entitiesByType';

export function entityByKey<T extends UnknownBuildContext>(
    snapshot: BuildSnapshotDto | undefined,
    type: EntityType,
    key: string,
): T | undefined {
    return entitiesByType(snapshot, type).find(entity => entity.context.key === key) as T;
}

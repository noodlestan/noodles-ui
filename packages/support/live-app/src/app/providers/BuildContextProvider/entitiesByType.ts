import { BuildSnapshotDto, EntityType, UnknownBuildContext } from '@noodles-ui/support-types';

export function entitiesByType<T extends UnknownBuildContext>(
    snapshot: BuildSnapshotDto | undefined,
    type: EntityType,
): T[] {
    return Object.values(snapshot?.entities[type] || {});
}

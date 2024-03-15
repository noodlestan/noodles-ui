import {
    BuildSnapshotDto,
    EntityType,
    ItemContextWithInstance,
    UnknownResource,
} from '@noodles-ui/support-types';

export function entitiesByType<T extends ItemContextWithInstance<UnknownResource>>(
    snapshot: BuildSnapshotDto | undefined,
    type: EntityType,
): T[] {
    return Object.values(snapshot?.entities[type] || {});
}

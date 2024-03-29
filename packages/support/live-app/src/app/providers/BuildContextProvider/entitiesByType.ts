import { BuildSnapshotDto, EntityType, UnknownBuildContextDto } from '@noodles-ui/support-types';

export function entitiesByType<T extends UnknownBuildContextDto>(
    snapshot: BuildSnapshotDto | undefined,
    type: EntityType,
    filter?: (item: UnknownBuildContextDto) => boolean,
): T[] {
    const all = Object.values(snapshot?.entities[type] || {});

    return filter ? all.filter(filter) : all;
}

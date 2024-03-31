import { BuildSnapshot, EntityType, UnknownBuildContext } from '@noodles-ui/support-types';

export function entitiesByType<T extends UnknownBuildContext>(
    snapshot: BuildSnapshot | undefined,
    type: EntityType,
    filter?: (item: UnknownBuildContext) => boolean,
): T[] {
    const all = Object.values(snapshot?.entities[type] || {});

    return filter ? all.filter(filter) : all;
}

import { BuildSnapshotDto, EntityType, UnknownBuildContextDto } from '@noodles-ui/support-types';

export function entityByKey<T extends UnknownBuildContextDto>(
    snapshot: BuildSnapshotDto | undefined,
    type: EntityType,
    key: string,
): T | undefined {
    const byType = snapshot?.entities[type] || {};
    return byType[key] as T;
}

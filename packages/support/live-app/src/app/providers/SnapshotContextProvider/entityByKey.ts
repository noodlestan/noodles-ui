import { BuildSnapshot, EntityType, UnknownBuildContext } from '@noodles-ui/support-types';

export function entityByKey<T extends UnknownBuildContext>(
    snapshot: BuildSnapshot | undefined,
    type: EntityType,
    key: string,
): T | undefined {
    const byType = snapshot?.entities[type];
    return byType?.get(key) as T;
}

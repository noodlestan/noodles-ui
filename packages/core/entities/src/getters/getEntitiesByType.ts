import { EntityBuildMap, UnknownBuildContext } from '../context';
import { ProjectEntities } from '../project-entities';
import { EntityType } from '../types';

export function getEntitiesByType<T extends UnknownBuildContext>(
    context: ProjectEntities | undefined,
    type: EntityType,
    filter?: (item: UnknownBuildContext) => boolean,
): T[] {
    const map = context?.entities[type] as EntityBuildMap<T>;
    const values = map?.values() || [];
    const all = Array.from(values);

    return filter ? all.filter(filter) : all;
}

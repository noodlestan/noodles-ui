import { UnknownBuildContext } from '../context';
import { ProjectEntities } from '../project-entities';
import { EntityType } from '../types';

export function getEntityByKey<T extends UnknownBuildContext>(
    context: ProjectEntities | undefined,
    type: EntityType,
    key: string,
): T | undefined {
    const byType = context?.entities[type];
    return byType?.get(key) as T;
}

import { getSystem } from '../../getters';
import { ProjectEntities } from '../../project-entities';
import { safeName } from '../../util/safeName';

export const getSystemComponentName = (context: ProjectEntities): string => {
    return safeName(getSystem(context).entity.name) + 'Root';
};

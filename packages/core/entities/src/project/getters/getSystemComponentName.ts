import { getProject } from '../../getters';
import { ProjectEntities } from '../../project-entities';
import { safeName } from '../../util/safeName';

export const getSystemComponentName = (context: ProjectEntities): string => {
    return safeName(getProject(context).entity.name || 'NUI') + 'Root';
};

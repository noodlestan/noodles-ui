import { getResourceModule } from '../../project/resources/getResourceModule';
import { getResourceName } from '../../project/resources/getResourceName';
import { getResourceType } from '../../project/resources/getResourceType';
import { ProjectContext } from '../../types/projects';
import { UnknownResource } from '../../types/resources';

export const shouldExpand = (
    project: ProjectContext,
    resource: string | UnknownResource,
): boolean => {
    if (typeof resource === 'string') {
        return !!project.debug.find(pattern => resource.includes(pattern));
    }

    const type = getResourceType(resource);
    const name = getResourceName(resource);
    const module = getResourceModule(resource);

    const matchResource = (pattern: string): boolean => {
        if (pattern === type || pattern === type + 's') {
            return true;
        }
        if (pattern.startsWith('@') && module.includes(pattern.substring(1))) {
            return true;
        }
        if (name.includes(pattern)) {
            return true;
        }
        return false;
    };

    return !!project.debug.find(matchResource);
};

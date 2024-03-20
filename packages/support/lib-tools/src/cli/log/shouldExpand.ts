import { ProjectContext, UnknownResource } from '@noodles-ui/support-types';

import { getResourceModule } from '../../project/resources/getters/getResourceModule';
import { getResourceName } from '../../project/resources/getters/getResourceName';
import { getResourceType } from '../../project/resources/getters/getResourceType';

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

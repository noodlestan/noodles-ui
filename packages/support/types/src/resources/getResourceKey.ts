import { UnknownResource } from '../resources';

import { getResourceModule } from './getResourceModule';
import { getResourceName } from './getResourceName';

export const getResourceKey = (resource: UnknownResource): string => {
    const module = getResourceModule(resource);
    const name = getResourceName(resource);
    return module + '/' + name;
};

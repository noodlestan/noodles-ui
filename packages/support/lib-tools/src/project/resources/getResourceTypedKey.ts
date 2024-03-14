import { UnknownResource } from '@noodles-ui/support-types';

import { getResourceModule } from './getResourceModule';
import { getResourceName } from './getResourceName';
import { getResourceType } from './getResourceType';

export const getResourceTypedKey = (resource: UnknownResource): string => {
    const type = getResourceType(resource);
    const module = getResourceModule(resource);
    const name = getResourceName(resource);
    return type + ':' + module + '/' + name;
};

import { ItemContext, UnknownResource } from '@noodles-ui/support-types';

import { getResourceKey } from '../resources/getResourceKey';

export function newContextResource<T extends UnknownResource, P extends UnknownResource = T>(
    resource: T,
): ItemContext<T, P> {
    return {
        key: getResourceKey(resource),
        resource,
        public: false,
        consumes: new Set(),
        consumers: new Set(),
    };
}

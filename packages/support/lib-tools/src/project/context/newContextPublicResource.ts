import { ItemContext, UnknownResource } from '@noodles-ui/support-types';

import { getResourceKey } from '../resources/getResourceKey';

export function newContextPublicResource<T extends UnknownResource, P extends UnknownResource = T>(
    resource: T,
): ItemContext<T, P> {
    return {
        key: getResourceKey(resource),
        resource,
        public: true,
        consumes: new Set(),
        consumers: new Set(),
        instance: undefined,
    };
}

import { ResourceContext, UnknownResource } from '@noodles-ui/support-types';

import { getResourceKey } from '../resources/getResourceKey';

export function newResourceContextPublic<T extends UnknownResource>(
    resource: T,
): ResourceContext<T> {
    return {
        key: getResourceKey(resource),
        resource,
        public: true,
        consumes: new Set(),
        consumers: new Set(),
    };
}

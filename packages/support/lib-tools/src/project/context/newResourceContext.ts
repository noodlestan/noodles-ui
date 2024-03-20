import { ResourceContext, UnknownResource } from '@noodles-ui/support-types';

import { getResourceKey } from '../resources/getters/getResourceKey';

export function newResourceContext<T extends UnknownResource>(resource: T): ResourceContext<T> {
    return {
        key: getResourceKey(resource),
        resource,
        public: false,
        consumes: new Set(),
        consumers: new Set(),
    };
}

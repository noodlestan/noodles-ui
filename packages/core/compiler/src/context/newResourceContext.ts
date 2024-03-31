import { ResourceContext, UnknownResource, getResourceKey } from '@noodles-ui/core-resources';

export function newResourceContext<T extends UnknownResource>(resource: T): ResourceContext<T> {
    return {
        key: getResourceKey(resource),
        resource,
        public: false,
        consumes: new Set(),
        consumers: new Set(),
    };
}

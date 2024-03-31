import { ResourceContext, UnknownResource, getResourceKey } from '@noodles-ui/core-resources';

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

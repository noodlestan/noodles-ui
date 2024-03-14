import { ItemContext, UnknownResource } from '@noodles-ui/support-types';

export function newContextPublicResource<T extends UnknownResource, P extends UnknownResource = T>(
    resource: T,
): ItemContext<T, P> {
    return {
        resource,
        public: true,
        consumes: new Set(),
        consumers: new Set(),
        instance: undefined,
    };
}

import { ItemContext } from '../../types/projects';
import { UnknownResource } from '../../types/resources';

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

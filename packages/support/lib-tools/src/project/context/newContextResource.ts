import { ItemContext } from '../../types/projects';
import { UnknownResource } from '../../types/resources';

export function newContextResource<T extends UnknownResource, P extends UnknownResource = T>(
    resource: T,
): ItemContext<T, P> {
    return {
        resource,
        public: false,
        consumes: new Set(),
        consumers: new Set(),
    };
}

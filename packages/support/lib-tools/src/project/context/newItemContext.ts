import { ItemContext } from '../../types/projects';
import { UnknownResource } from '../../types/resources';

export function newItemContext<T extends UnknownResource, P extends UnknownResource = T>(
    theme: T,
): ItemContext<T, P> {
    return {
        resource: theme,
        public: false,
        consumes: new Set(),
        consumers: new Set(),
    };
}

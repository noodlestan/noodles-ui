import { ItemContext } from '../../types/projects';
import { UnknownResource } from '../../types/resources';

export function newPublicItemContext<T extends UnknownResource, P extends UnknownResource = T>(
    theme: T,
): ItemContext<T, P> {
    return {
        resource: theme,
        public: true,
        consumes: new Set(),
        consumers: new Set(),
        instance: undefined,
    };
}

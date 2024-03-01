import { ItemContext } from '../../types/projects';
import { UnknownResource } from '../../types/resources';

export function newItemContext<T extends UnknownResource>(theme: T): ItemContext<T> {
    return {
        resource: theme,
        public: false,
        consumes: new Set(),
        consumers: new Set(),
    };
}

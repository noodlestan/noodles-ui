import { ItemContext } from '../../types/projects';
import { UnknownResource } from '../../types/resources';

export function newPublicItemContext<T extends UnknownResource>(theme: T): ItemContext<T> {
    return {
        resource: theme,
        public: true,
        consumes: new Set(),
        consumers: new Set(),
    };
}

import { ItemContext } from '../../types/projects';
import { UnknownResource } from '../../types/resources';
import { getResourceTypedKey } from '../resources/getResourceTypedKey';

export function newContextResourceWithConsumer<
    T extends UnknownResource,
    C extends UnknownResource = T,
>(context: ItemContext<C>, newResource: T, consumer: C): ItemContext<T> {
    const consumerRef = getResourceTypedKey(consumer);
    const consumers = new Set<string>();
    consumers.add(consumerRef);
    return {
        ...structuredClone(context),
        instance: undefined,
        resource: newResource as T,
        public: false,
        consumes: new Set(),
        consumers,
    };
}

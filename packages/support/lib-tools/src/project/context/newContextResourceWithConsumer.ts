import { ItemContext } from '../../types/projects';
import { UnknownResource } from '../../types/resources';
import { getResourceTypedKey } from '../resources/getResourceTypedKey';

export function newContextResourceWithConsumer<
    T extends UnknownResource,
    P extends UnknownResource = T,
>(
    context: ItemContext<unknown, unknown>,
    newResource: T,
    consumer: UnknownResource,
): ItemContext<T, P> {
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

import { ItemContext, UnknownResource } from '@noodles-ui/support-types';

import { getResourceTypedKey } from '../resources/getResourceTypedKey';

export function newContextResourceWithConsumer<
    T extends UnknownResource,
    P extends UnknownResource = T,
>(consumerContext: ItemContext<UnknownResource>, newResource: T): ItemContext<T, P> {
    const { resource: consumer } = consumerContext;
    const consumerRef = getResourceTypedKey(consumer);
    const consumers = new Set<string>();
    consumers.add(consumerRef);
    return {
        ...structuredClone(consumerContext),
        instance: undefined,
        resource: newResource as T,
        public: false,
        consumes: new Set(),
        consumers,
    };
}

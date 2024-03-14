import { ItemContext, UnknownResource } from '@noodles-ui/support-types';

import { getResourceTypedKey } from '../resources/getResourceTypedKey';

export function newContextPublicResourceWithConsumer<
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
        public: true,
        consumes: new Set(),
        consumers,
    };
}

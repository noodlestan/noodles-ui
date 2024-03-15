import { ResourceContext, UnknownResource } from '@noodles-ui/support-types';

import { getResourceTypedKey } from '../resources/getResourceTypedKey';

export function newResourceContextPublicWithConsumer<T extends UnknownResource>(
    consumerContext: ResourceContext<UnknownResource>,
    newResource: T,
): ResourceContext<T> {
    const { resource: consumer } = consumerContext;
    const consumerRef = getResourceTypedKey(consumer);
    const consumers = new Set<string>();
    consumers.add(consumerRef);
    return {
        ...structuredClone(consumerContext),
        resource: newResource as T,
        public: true,
        consumes: new Set(),
        consumers,
    };
}

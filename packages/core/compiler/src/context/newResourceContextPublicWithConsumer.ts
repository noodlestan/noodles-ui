import {
    ResourceContext,
    UnknownResource,
    getResourceKey,
    getResourceTypedKey,
} from '@noodles-ui/core-resources';

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
        key: getResourceKey(newResource),
        resource: newResource as T,
        public: true,
        consumes: new Set(),
        consumers,
    };
}

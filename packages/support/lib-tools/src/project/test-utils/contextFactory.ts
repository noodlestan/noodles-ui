import { UnknownResource } from '@noodles-ui/support-types';

export function contextFactory<T>(instance?: UnknownResource): T {
    return {
        key: '',
        resource: instance,
        public: true,
        consumes: new Set(),
        consumers: new Set(),
    } as T;
}

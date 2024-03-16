import { UnknownResource } from '@noodles-ui/support-types';

type ResourceType = 'surface' | 'theme';
export function resourceFactory<T>(type: ResourceType, overides?: Partial<UnknownResource>): T {
    return { type, name: '', module: '', extend: [], ...overides } as T;
}

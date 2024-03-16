import { EntityType, UnknownResource } from '@noodles-ui/support-types';

export function resourceFactory<T>(type: EntityType, overides?: Partial<UnknownResource>): T {
    return { type, name: '', module: '', extend: [], ...overides } as T;
}

import { EntityType } from '@noodles-ui/core-entities';
import { UnknownResource } from '@noodles-ui/core-resources';

export function resourceFactory<T>(type: EntityType, overides?: Partial<UnknownResource>): T {
    return { type, name: '', module: '', extend: [], ...overides } as T;
}

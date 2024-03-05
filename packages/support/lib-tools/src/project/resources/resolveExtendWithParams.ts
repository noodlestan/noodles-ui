import { Resource } from '@noodles-ui/core-types';
import { Params } from '@noodles-ui/core-types/src/primitives/params';
import { ExtendWithParams } from '@noodles-ui/core-types/src/primitives/utils';

import { UnknownExtendResource, UnknownResource } from '../../types/resources';

export function resolveExtendWithParams<T extends UnknownResource>(
    extend: ExtendWithParams<Partial<Resource<string>> | UnknownExtendResource, Params>,
): { parent: T; params: Params } {
    const parent = Array.isArray(extend) ? extend[0] : extend;
    const params = Array.isArray(extend) ? extend[1] : {};
    return { parent: parent as T, params };
}

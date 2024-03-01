import { Params } from '@noodles-ui/core-types/src/primitives/params';

import { UnknownExtendResource, UnknownResource } from '../../types/resources';

export function resolveResourceParent<T extends UnknownResource>(
    resource: UnknownExtendResource,
): { parent: T; params: Params } {
    const { extend } = resource;
    const parent = Array.isArray(extend) ? extend[0] : extend;
    const params = Array.isArray(extend) ? extend[1] : {};
    return { parent: parent as T, params };
}

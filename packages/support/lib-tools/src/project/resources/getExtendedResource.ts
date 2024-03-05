import { ExtendParams } from '@noodles-ui/core-types/src/primitives/params';
import { ExtendWithParams } from '@noodles-ui/core-types/src/primitives/utils';

import { UnknownResource } from '../../types/resources';

export const getExtendedResource = (
    extend: ExtendWithParams<UnknownResource, ExtendParams>,
): UnknownResource => {
    return Array.isArray(extend) ? extend[0] : extend;
};

import {
    ComponentInstance,
    PropVariantInstance,
    PropVariantReference,
} from '@noodles-ui/core-types';

import { hasPropDefaultValue } from './hasPropDefaultValue';
import { isPropVariant } from './isPropVariant';

export const getPropVariantsWithDefaultValues = (
    instance: ComponentInstance,
): (PropVariantInstance | PropVariantReference)[] => {
    return Object.values(instance.props || {}).filter(
        prop => hasPropDefaultValue(prop) && isPropVariant(prop),
    ) as (PropVariantInstance | PropVariantReference)[];
};

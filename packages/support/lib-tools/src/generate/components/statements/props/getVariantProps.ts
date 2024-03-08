import {
    ComponentInstance,
    PropVariantInstance,
    PropVariantReference,
} from '@noodles-ui/core-types';

import { isPropVariant } from './isPropVariant';

export const getVariantProps = (
    instance: ComponentInstance,
): (PropVariantInstance | PropVariantReference)[] => {
    return Object.values(instance.props || {}).filter(isPropVariant) as (
        | PropVariantInstance
        | PropVariantReference
    )[];
};

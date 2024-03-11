import {
    ComponentInstance,
    PropVariantInstance,
    PropVariantReference,
} from '@noodles-ui/core-types';

import { hasPropVariantMixin } from './hasPropVariantMixin';

export const getVariantPropsWithMixin = (
    instance: ComponentInstance,
): (PropVariantInstance | PropVariantReference)[] => {
    return Object.values(instance.props || {}).filter(hasPropVariantMixin) as (
        | PropVariantInstance
        | PropVariantReference
    )[];
};

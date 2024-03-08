import { PropInstance, PropVariantInstance } from '@noodles-ui/core-types';

import { isPropVariantInstance } from './isPropVariantInstance';
import { isPropVariantReference } from './isPropVariantReference';

export const hasPropVariantMixin = (prop: PropInstance): PropVariantInstance | undefined => {
    const propVariant = isPropVariantInstance(prop);
    if (propVariant && propVariant.variant.mixin) {
        return prop as PropVariantInstance;
    }
    const propReference = isPropVariantReference(prop);
    if (propReference && propReference.reference.mixin) {
        return prop as PropVariantInstance;
    }
};

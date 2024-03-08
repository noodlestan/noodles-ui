import { PropVariantInstance, PropVariantReference } from '@noodles-ui/core-types';

import { isPropVariantInstance } from './isPropVariantInstance';
import { isPropVariantReference } from './isPropVariantReference';

export const getPropVariantOptions = (
    prop: PropVariantInstance | PropVariantReference,
): string[] => {
    const instance = isPropVariantInstance(prop);
    if (instance) {
        return instance.variant.options || [];
    }
    const reference = isPropVariantReference(prop);
    if (reference) {
        return reference.reference.options || [];
    }

    throw new Error();
};

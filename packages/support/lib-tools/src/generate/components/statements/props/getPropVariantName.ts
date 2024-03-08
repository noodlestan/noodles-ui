import { PropVariantInstance, PropVariantReference } from '@noodles-ui/core-types';

import { isPropVariantInstance } from './isPropVariantInstance';
import { isPropVariantReference } from './isPropVariantReference';

export const getPropVariantName = (prop: PropVariantInstance | PropVariantReference): string => {
    const instance = isPropVariantInstance(prop);
    if (instance) {
        return instance.variant.name;
    }
    const reference = isPropVariantReference(prop);
    if (reference) {
        return reference.reference.name;
    }

    throw new Error();
};

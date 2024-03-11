import { PropVariantInstance, PropVariantReference, Value } from '@noodles-ui/core-types';

import { isPropVariantInstance } from './isPropVariantInstance';
import { isPropVariantReference } from './isPropVariantReference';

export const getPropDefaultValue = (prop: PropVariantInstance | PropVariantReference): Value => {
    if ('defaultValue' in prop) {
        return prop.defaultValue;
    }

    const instance = isPropVariantInstance(prop);
    if (instance) {
        return instance.variant.defaultValue;
    }

    const reference = isPropVariantReference(prop);
    if (reference) {
        return reference.reference.defaultValue;
    }

    return undefined;
};

import { PropInstance } from '@noodles-ui/core-types';

import { isPropVariantInstance } from './isPropVariantInstance';
import { isPropVariantReference } from './isPropVariantReference';

export const hasPropDefaultValue = (prop: PropInstance): boolean => {
    if (prop.defaultValue !== undefined) {
        return true;
    }

    const instance = isPropVariantInstance(prop);
    if (instance) {
        return instance.variant.defaultValue !== undefined;
    }

    const reference = isPropVariantReference(prop);
    if (reference) {
        return reference.reference.defaultValue !== undefined;
    }

    return false;
};

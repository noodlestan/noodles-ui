import { PropEntity } from '@noodles-ui/core-types';

import { isPropVariantEntity } from './isPropVariantEntity';
import { isPropVariantReference } from './isPropVariantReference';

export const hasPropDefaultValue = (prop: PropEntity): boolean => {
    if (prop.defaultValue !== undefined) {
        return true;
    }

    const entity = isPropVariantEntity(prop);
    if (entity) {
        return entity.variant.defaultValue !== undefined;
    }

    const reference = isPropVariantReference(prop);
    if (reference) {
        return reference.reference.defaultValue !== undefined;
    }

    return false;
};

import { PropEntity, Value } from '@noodles-ui/core-types';

import { isPropVariantEntity } from './isPropVariantEntity';
import { isPropVariantReference } from './isPropVariantReference';

export const getPropDefaultValue = (prop: PropEntity): Value => {
    if ('defaultValue' in prop) {
        return prop.defaultValue;
    }

    const entity = isPropVariantEntity(prop);
    if (entity) {
        return entity.variant.defaultValue;
    }

    const reference = isPropVariantReference(prop);
    if (reference) {
        return reference.reference.defaultValue;
    }

    return undefined;
};

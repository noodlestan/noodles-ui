import { PropVariantEntity, PropVariantReference } from '@noodles-ui/core-types';

import { isPropVariantEntity } from './isPropVariantEntity';
import { isPropVariantReference } from './isPropVariantReference';

export const getPropVariantOptions = (prop: PropVariantEntity | PropVariantReference): string[] => {
    const entity = isPropVariantEntity(prop);
    if (entity) {
        return entity.variant.options || [];
    }
    const reference = isPropVariantReference(prop);
    if (reference) {
        return reference.reference.options || [];
    }

    throw new Error();
};

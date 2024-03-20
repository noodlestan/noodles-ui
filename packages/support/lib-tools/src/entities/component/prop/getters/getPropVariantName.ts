import { PropVariantEntity, PropVariantReference } from '@noodles-ui/core-types';

import { isPropVariantEntity } from './isPropVariantEntity';
import { isPropVariantReference } from './isPropVariantReference';

export const getPropVariantName = (prop: PropVariantEntity | PropVariantReference): string => {
    const entity = isPropVariantEntity(prop);
    if (entity) {
        return entity.variant.name;
    }

    const reference = isPropVariantReference(prop);
    if (reference) {
        return reference.reference.name;
    }

    throw new Error();
};

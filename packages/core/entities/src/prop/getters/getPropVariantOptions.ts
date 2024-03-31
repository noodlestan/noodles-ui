import { PropEntity } from '../..';

import { isPropVariantEntity } from './isPropVariantEntity';
import { isPropVariantReference } from './isPropVariantReference';

export const getPropVariantOptions = (prop: PropEntity): string[] => {
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

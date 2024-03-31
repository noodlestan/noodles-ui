import { PropEntity, PropVariantEntity, PropVariantReference } from '../..';

import { isPropVariantEntity } from './isPropVariantEntity';
import { isPropVariantReference } from './isPropVariantReference';

export const hasPropVariantMixin = (prop: PropEntity): PropEntity | undefined => {
    const propVariant = isPropVariantEntity(prop);
    if (propVariant && propVariant.variant.mixin) {
        return prop as PropVariantEntity;
    }

    const propReference = isPropVariantReference(prop);
    if (propReference && propReference.reference.mixin) {
        return prop as PropVariantReference;
    }
};

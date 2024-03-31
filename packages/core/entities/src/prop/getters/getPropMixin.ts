import { MixinInlineResource } from '@noodles-ui/core-resources';

import { PropEntity, PropVariantEntity, PropVariantReference } from '../..';

import { isPropVariantEntity } from './isPropVariantEntity';
import { isPropVariantReference } from './isPropVariantReference';

export const getPropMixin = (prop: PropEntity): MixinInlineResource | undefined => {
    const propVariant = isPropVariantEntity(prop);
    if (propVariant && propVariant.variant.mixin) {
        return (prop as PropVariantEntity).variant.mixin;
    }

    const propReference = isPropVariantReference(prop);
    if (propReference && propReference.reference.mixin) {
        return (prop as PropVariantReference).reference.mixin;
    }
};

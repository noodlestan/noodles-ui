import { LocalPropResource, VariantInlineReferenceResource } from '@noodles-ui/core-types';

export const isVariantInlineReferenceResource = (
    prop: LocalPropResource,
): VariantInlineReferenceResource | undefined => {
    if ((prop as VariantInlineReferenceResource).reference) {
        return prop as VariantInlineReferenceResource;
    }
};

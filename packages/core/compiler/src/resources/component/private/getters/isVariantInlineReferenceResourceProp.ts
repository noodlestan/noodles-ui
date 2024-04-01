import { LocalPropResource, VariantInlineReferenceResource } from '@noodles-ui/core-resources';

export const isVariantInlineReferenceResourceProp = (
    prop: LocalPropResource,
): VariantInlineReferenceResource | undefined => {
    if ((prop as VariantInlineReferenceResource).reference) {
        return prop as VariantInlineReferenceResource;
    }
};

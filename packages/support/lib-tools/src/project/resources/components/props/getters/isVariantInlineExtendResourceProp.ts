import { LocalPropResource, VariantInlineExtendResource } from '@noodles-ui/core-types';

export const isVariantInlineExtendResourceProp = (
    prop: LocalPropResource,
): VariantInlineExtendResource | undefined => {
    if ((prop as VariantInlineExtendResource).extend) {
        return prop as VariantInlineExtendResource;
    }
};

import { VariantExtendResource, VariantResource } from '@noodles-ui/core-resources';

export const isVariantExtendResource = (
    variant: VariantResource,
): VariantExtendResource | undefined => {
    if ((variant as VariantExtendResource).extend) {
        return variant as VariantExtendResource;
    }
};

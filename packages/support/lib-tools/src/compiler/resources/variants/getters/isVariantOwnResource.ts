import { VariantOwnResource, VariantResource } from '@noodles-ui/core-types';

export const isVariantOwnResource = (variant: VariantResource): VariantOwnResource | undefined => {
    if ((variant as VariantOwnResource).type === 'variant') {
        return variant as VariantOwnResource;
    }
};

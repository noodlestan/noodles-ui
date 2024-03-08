import { VariantOwnResource, VariantResource } from '@noodles-ui/core-types';

export const isVariantOwnResource = (prop: VariantResource): VariantOwnResource | undefined => {
    if ((prop as VariantOwnResource).module) {
        return prop as VariantOwnResource;
    }
};

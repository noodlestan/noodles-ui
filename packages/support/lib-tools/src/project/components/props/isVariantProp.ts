import { LocalPropResource, VariantOwnResource } from '@noodles-ui/core-types';

export const isPropVariant = (prop: LocalPropResource): VariantOwnResource | undefined => {
    const { type, options } = prop as VariantOwnResource;
    if (type === 'variant' || options) {
        return prop as VariantOwnResource;
    }
};

import { LocalPropResource, VariantOwnResource } from '@noodles-ui/core-types';

export const isPropVariant = (prop: LocalPropResource): VariantOwnResource | undefined => {
    const { type } = prop as VariantOwnResource;
    if (type === 'variant') {
        return prop as VariantOwnResource;
    }
};

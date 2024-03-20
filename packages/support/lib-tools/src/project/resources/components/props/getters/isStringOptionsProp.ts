import { LocalPropResource, VariantOwnResource } from '@noodles-ui/core-types';

export const isStringOptionsProp = (prop: LocalPropResource): VariantOwnResource | undefined => {
    const { options } = prop as VariantOwnResource;
    if (options && options.length) {
        return prop as VariantOwnResource;
    }
};

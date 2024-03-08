import { LocalPropResource, VariantOwnResource } from '@noodles-ui/core-types';

export const isPropStringOptions = (prop: LocalPropResource): VariantOwnResource | undefined => {
    const { options } = prop as VariantOwnResource;
    if (options && options.length) {
        return prop as VariantOwnResource;
    }
};

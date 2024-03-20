import { LocalPropResource, VariantOwnResource } from '@noodles-ui/core-types';

export const hasPropDefaultValue = (prop: LocalPropResource): VariantOwnResource | undefined => {
    const { defaultValue } = prop as VariantOwnResource;
    if (defaultValue !== undefined) {
        return prop as VariantOwnResource;
    }
};

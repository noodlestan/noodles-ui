import { LocalPropResource, VariantInlineResource } from '@noodles-ui/core-resources';

export const isVariantInlineProp = (prop: LocalPropResource): VariantInlineResource | undefined => {
    const { type } = prop as VariantInlineResource;
    if (type === 'variant') {
        return prop as VariantInlineResource;
    }
};

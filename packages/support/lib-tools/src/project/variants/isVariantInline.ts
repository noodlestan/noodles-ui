import { LocalPropResource, VariantInlineResource } from '@noodles-ui/core-types';

export const isVariantInline = (prop: LocalPropResource): VariantInlineResource | undefined => {
    const { type } = prop as VariantInlineResource;
    if (type === 'variant') {
        return prop as VariantInlineResource;
    }
};

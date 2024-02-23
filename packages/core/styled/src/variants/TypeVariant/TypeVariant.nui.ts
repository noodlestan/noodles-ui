import { VariantResource } from '@noodles-ui/core-types';

export const TypeVariant: VariantResource = {
    type: 'variant',
    name: 'TypeVariant',
    attribute: 'variant',
    options: [],
    params: ['family'],
    tokens: [
        {
            pattern: '--type-#{family}-base-fontFamily',
        },
        {
            pattern: '--type-#{family}-#{$option}-fontSize',
        },
        {
            pattern: '--type-#{family}-#{$option}-lineHeight',
        },
        {
            pattern: '--type-#{family}-#{$option}-fontWeight',
        },
        {
            pattern: '--type-#{family}-#{$option}-letterSpacing',
        },
    ],
};

import { VariantOwnResource } from '@noodles-ui/core-resources';

export const TypographyFamilyVariants: VariantOwnResource = {
    type: 'variant',
    name: 'ComposableTypeVariant',
    module: '@noodles-ui/core-styled',
    mixin: {
        name: 'TypographyFamilyVariants',
        role: 'scss:variant',
        source: '@noodles-ui/core-styled/src/variants/TypographyFamily/TypographyFamilyVariants.scss',
        implementation: "@include TypographyFamilyVariants($#{VARIANTS}, '#{family}');",
        params: ['family'],
        tokens: [
            {
                pattern: '--type-#{family}-base-fontFamily',
            },
            {
                pattern: '--type-#{family}-base-fontSize',
            },
            {
                pattern: '--type-#{family}-base-lineHeight',
            },
            {
                pattern: '--type-#{family}-base-fontWeight',
            },
            {
                pattern: '--type-#{family}-base-letterSpacing',
            },
            {
                pattern: '--type-#{family}-#{option}-fontSize',
            },
            {
                pattern: '--type-#{family}-#{option}-lineHeight',
            },
            {
                pattern: '--type-#{family}-#{option}-fontWeight',
            },
            {
                pattern: '--type-#{family}-#{option}-letterSpacing',
            },
        ],
    },
    options: [],
};

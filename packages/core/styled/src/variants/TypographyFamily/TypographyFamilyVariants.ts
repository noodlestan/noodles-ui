import { VariantOwnResource } from '@noodles-ui/core-types';

export const TypographyFamilyVariants: VariantOwnResource = {
    type: 'variant',
    name: 'ComposableTypeVariant',
    module: '@noodles-ui/core-styled',
    composable: true,
    mixin: {
        name: 'TypographyFamilyVariants',
        role: 'scss:variant',
        source: '"@noodles-ui/core-styled/src/variants/MixinName.scss";',
        implementation: "@include TypographyFamilyVariants('#{family}', $#{variable});",
    },
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

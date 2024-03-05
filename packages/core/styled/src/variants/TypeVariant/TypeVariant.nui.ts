import { VariantOwnResource } from '@noodles-ui/core-types';

export const TypeVariant: VariantOwnResource = {
    type: 'variant',
    name: 'ComposableTypeVariant',
    module: '@noodles-ui/core-styled',
    composable: true,
    options: [],
    params: ['family'],
    // mixin: {
    //     source: '"@noodles-ui/core-styled/src/variants/TypeVariant/TypeVariant.scss";',
    //     implementation: '@include VariantsTypeVariant(#{family}, $#{variable});',
    // },
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

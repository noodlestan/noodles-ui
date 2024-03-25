import { VariantOwnResource } from '@noodles-ui/core-types';

export const Swatch: VariantOwnResource = {
    type: 'variant',
    name: 'Swatch',
    module: '@noodles-ui/core-styled',
    options: [],
    params: ['palette'],
    tokens: [
        {
            pattern: '--palette-#{palette}-#{option}-color',
        },
    ],
};

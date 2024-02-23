import { VariantResource } from '@noodles-ui/core-types';

export const Swatch: VariantResource = {
    type: 'variant',
    name: 'Swatch',
    options: [],
    params: ['palette'],
    tokens: [
        {
            pattern: '--palette-#{palette}-#{$option}-color',
        },
    ],
};

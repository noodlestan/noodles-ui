import { VariantResource } from '@noodles-ui/core-types';

export const FgColor: VariantResource = {
    type: 'variant',
    name: 'FgColor',
    module: '@noodles-ui/core-styled',
    attribute: 'color',
    options: ['default'],
    defaultOption: 'default',
    params: ['group'],
    surface: true,
    tokens: [
        {
            pattern: '--#{$group}-#{$option}-color',
        },
    ],
};

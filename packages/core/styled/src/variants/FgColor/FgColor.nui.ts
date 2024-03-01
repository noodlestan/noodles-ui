import { VariantOwnResource } from '@noodles-ui/core-types';

export const FgColor: VariantOwnResource = {
    type: 'variant',
    name: 'FgColor',
    module: '@noodles-ui/core-styled',
    composable: true,
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

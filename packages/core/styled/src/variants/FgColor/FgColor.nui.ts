import { VariantOwnResource } from '@noodles-ui/core-resources';

export const FgColor: VariantOwnResource = {
    type: 'variant',
    name: 'FgColor',
    module: '@noodles-ui/core-styled',
    options: ['default'],
    defaultValue: 'default',
    params: ['group'],
    surface: true,
    tokens: [
        {
            pattern: '--#{group}-#{option}-color',
        },
    ],
};

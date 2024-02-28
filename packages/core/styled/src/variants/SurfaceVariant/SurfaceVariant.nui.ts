import { VariantResource } from '@noodles-ui/core-types';

export const SurfaceVariant: VariantResource = {
    type: 'variant',
    name: 'SurfaceVariant',
    module: '@noodles-ui/core-styled',
    attribute: 'variant',
    options: ['stage', 'page', 'overlay'],
    vars: {
        state: ['base', 'interactive', 'active', 'disabled'],
    },
    tokens: [
        {
            pattern: '--surface-#{state}-fg',
        },
        {
            pattern: '--surface-#{state}-bg',
        },
        {
            pattern: '--surface-#{state}-border-color',
        },
        {
            pattern: '--surface-#{state}-border-style',
        },
        {
            pattern: '--surface-#{state}-border-width',
        },
        {
            pattern: '--surface-#{state}-border-radius',
        },
        {
            pattern: '--surface-#{state}-box-shadow',
        },
    ],
};

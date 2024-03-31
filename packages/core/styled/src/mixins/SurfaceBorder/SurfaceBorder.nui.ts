import { MixinResource } from '@noodles-ui/core-types';

export const SurfaceBorder: MixinResource = {
    type: 'mixin',
    name: 'SurfaceBorder',
    module: '@noodles-ui/styled',
    role: 'scss:mixin',
    source: '@noodles-ui/core-styled/src/mixins/SurfaceBorder/SurfaceBorder.scss',
    implementation: '@include SurfaceBorder();',
    vars: {
        state: ['base', 'interactive', 'active', 'disabled'],
    },
    surface: true,
    tokens: [
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

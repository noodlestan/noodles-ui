import { MixinResource } from '@noodles-ui/core-resources';

export const SurfaceBorderResource: MixinResource = {
    type: 'mixin',
    name: 'SurfaceBorder',
    module: '@noodles-ui/solidjs-styled',
    role: 'scss:mixin',
    source: '@noodles-ui/solidjs-styled/src/mixins/SurfaceBorder/SurfaceBorder.scss',
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

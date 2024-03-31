import { MixinResource } from '@noodles-ui/core-types';

export const SurfaceColor: MixinResource = {
    type: 'mixin',
    name: 'SurfaceColor',
    module: '@noodles-ui/styled',
    role: 'scss:mixin',
    source: '@noodles-ui/core-styled/src/mixins/SurfaceColor/SurfaceColor.scss',
    implementation: '@include SurfaceColor();',
    vars: {
        state: ['base', 'interactive', 'active', 'disabled'],
    },
    surface: true,
    tokens: [
        {
            pattern: '--surface-#{state}-fg',
        },
        {
            pattern: '--surface-#{state}-bg',
        },
    ],
};

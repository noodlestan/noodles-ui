import { MixinResource } from '@noodles-ui/core-resources';

export const SurfaceColorResource: MixinResource = {
    type: 'mixin',
    name: 'SurfaceColor',
    module: '@noodles-ui/solidjs-styled',
    role: 'scss:mixin',
    source: '@noodles-ui/solidjs-styled/src/mixins/SurfaceColor/SurfaceColor.scss',
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

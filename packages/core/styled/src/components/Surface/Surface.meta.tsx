import { SurfaceMeta as SurfaceUnstyledMeta } from '@noodles-ui/core-unstyled';

import { Surface as Component } from './Surface';

export const SurfaceMeta = {
    type: 'component',
    name: 'Surface',
    extend: SurfaceUnstyledMeta,
    component: Component,
    props: {
        variant: {
            name: 'SurfaceVariant',
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
        },
    },
};

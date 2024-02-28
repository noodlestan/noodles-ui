import { ComponentResource } from '@noodles-ui/core-types';

import { SurfaceResource } from '../Surface/Surface.nui';

export const CardResource: ComponentResource = {
    name: 'Card',
    module: '@noodles-ui/sandbox-ui',
    extend: SurfaceResource,
    hide: {
        variant: {
            value: 'card',
        },
    },
};

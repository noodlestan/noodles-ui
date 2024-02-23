import { ComponentResource } from '@noodles-ui/core-types';

import { SurfaceResource } from '../Surface/Surface.nui';

export const CardResource: ComponentResource = {
    extend: SurfaceResource,
    name: 'Card',
    api: {
        hide: {
            variant: {
                value: 'card',
            },
        },
    },
};

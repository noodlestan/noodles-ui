import { ComponentExtendResource } from '@noodles-ui/core-types';

import { SurfaceResource } from '../Surface/Surface.nui';

export const CardResource: ComponentExtendResource = {
    name: 'Card',
    module: '@noodles-ui/sandbox-ui',
    extend: SurfaceResource,
    hides: {
        variant: {
            value: 'card',
        },
    },
};

import { ComponentExtendResource } from '@noodles-ui/core-resources';

import { SurfaceResource } from '../Surface/Surface.nui';

export const CardResource: ComponentExtendResource = {
    type: 'component',
    name: 'Card',
    module: '@noodles-ui/lab-ui',
    extend: SurfaceResource,
    hides: {
        variant: {
            value: 'card',
        },
    },
};

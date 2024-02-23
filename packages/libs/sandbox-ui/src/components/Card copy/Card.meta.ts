import { ComponentMeta } from '@noodles-ui/core-services';

import { SurfaceMeta } from '../Surface/Surface.nui';

export const CardMeta: ComponentMeta = {
    extend: SurfaceMeta,
    name: 'Card',
    api: {
        hide: {
            variant: {
                value: 'card',
            },
        },
    },
};

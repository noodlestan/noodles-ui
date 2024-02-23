import { ComponentResource } from '@noodles-ui/core-types';

import { SurfaceResource } from '../Surface/Surface.nui';

export const BannerResource: ComponentResource = {
    extend: SurfaceResource,
    name: 'Banner',
    api: {
        hide: {
            variant: {
                value: 'banner',
            },
        },
    },
};

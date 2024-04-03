import { ComponentExtendResource } from '@noodles-ui/core-resources';

import { SurfaceResource } from '../Surface/Surface.nui';

export const BannerResource: ComponentExtendResource = {
    type: 'component',
    name: 'Banner',
    module: '@noodles-ui/lab-ui',
    extend: SurfaceResource,
    hides: {
        variant: {
            value: 'banner',
        },
    },
};

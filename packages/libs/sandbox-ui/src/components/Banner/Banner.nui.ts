import { ComponentExtendResource } from '@noodles-ui/core-types';

import { SurfaceResource } from '../Surface/Surface.nui';

export const BannerResource: ComponentExtendResource = {
    name: 'Banner',
    module: '@noodles-ui/sandbox-ui',
    extend: SurfaceResource,
    hides: {
        variant: {
            value: 'banner',
        },
    },
};

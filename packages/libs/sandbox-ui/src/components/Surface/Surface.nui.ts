import { SurfaceResource as SurfaceStyledResource } from '@noodles-ui/core-styled';
import { ComponentResource } from '@noodles-ui/core-types';

export const SurfaceResource: ComponentResource = {
    extend: SurfaceStyledResource,
    api: {
        override: {
            variant: {
                options: ['stage', 'page', 'card', 'inverse'],
            },
        },
    },
};

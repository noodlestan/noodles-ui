import { ComponentResource } from '@noodles-ui/core-types';
import { SurfaceResource as SurfaceUnstyledResource } from '@noodles-ui/core-unstyled';

import { SurfaceVariant } from '../../variants/SurfaceVariant/SurfaceVariant.nui';

export const SurfaceResource: ComponentResource = {
    name: 'StyledSurface',
    module: '@noodles-ui/core-styled',
    extend: SurfaceUnstyledResource,
    props: {
        variant: {
            extend: SurfaceVariant,
        },
        styled: {},
    },
};

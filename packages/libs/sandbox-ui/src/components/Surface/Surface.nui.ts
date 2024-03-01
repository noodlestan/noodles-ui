import { SurfaceResource as SurfaceStyledResource } from '@noodles-ui/core-styled';
import { ComponentResource } from '@noodles-ui/core-types';

export const SurfaceResource: ComponentResource = {
    type: 'component',
    module: '@noodles-ui/sandbox-ui',
    extend: SurfaceStyledResource,
};

import { ComponentExtendResource } from '@noodles-ui/core-resources';
import { SurfaceResource as SurfaceStyledResource } from '@noodles-ui/solidjs-styled';

export const SurfaceResource: ComponentExtendResource = {
    module: '@noodles-ui/lab-ui',
    extend: SurfaceStyledResource,
};

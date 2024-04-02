import { ComponentOwnResource } from '@noodles-ui/core-resources';
import { SurfaceResource as SurfaceStyledResource } from '@noodles-ui/solidjs-styled';

export const SurfaceResource: ComponentOwnResource = {
    type: 'component',
    name: 'Surface',
    module: '@noodles-ui/lab-ui',
    render: {
        from: SurfaceStyledResource,
        name: 'Surface',
    },
};

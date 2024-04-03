import { ComponentOwnResource } from '@noodles-ui/core-resources';
import {
    SurfaceColorResource,
    SurfaceResource as SurfaceStyledResource,
} from '@noodles-ui/solidjs-styled';

export const SurfaceResource: ComponentOwnResource = {
    type: 'component',
    name: 'Surface',
    module: '@noodles-ui/lab-ui',
    exposes: '*',
    use: [SurfaceColorResource],
    // overrides: {
    //     variant: {
    //         defaultValue: 'stage',
    //     },
    // },
    render: {
        from: SurfaceStyledResource,
        name: 'Surface',
    },
};

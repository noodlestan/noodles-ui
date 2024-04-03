import { ComponentRenderResource } from '@noodles-ui/core-resources';
import {
    SurfaceColorResource,
    SurfaceResource as SurfaceStyledResource,
} from '@noodles-ui/solidjs-styled';

export const SurfaceResource: ComponentRenderResource = {
    type: 'component',
    name: 'Surface',
    module: '@noodles-ui/lab-ui',
    render: {
        from: SurfaceStyledResource,
        name: 'Surface',
    },
    use: [SurfaceColorResource],
    exposes: '*',
};

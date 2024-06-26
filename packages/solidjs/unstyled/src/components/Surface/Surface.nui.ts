import { ComponentImportResource } from '@noodles-ui/core-resources';

export const SurfaceResource: ComponentImportResource = {
    type: 'component',
    name: 'Surface',
    module: '@noodles-ui/solidjs-unstyled',
    parts: [
        {
            name: 'Surface',
            props: {
                children: {},
            },
        },
    ],
};

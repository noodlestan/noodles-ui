import { ComponentImportResource } from '@noodles-ui/core-resources';

export const SurfaceResource: ComponentImportResource = {
    type: 'component',
    name: 'Text',
    module: '@noodles-ui/core-unstyled',
    parts: [
        {
            name: 'Surface',
            props: {
                children: {},
            },
        },
    ],
};

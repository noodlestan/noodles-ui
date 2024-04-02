import {
    ComponentImportResource,
    VariantInlineReferenceResource,
} from '@noodles-ui/core-resources';

import { SurfaceVariant } from '../../variants/SurfaceVariant/SurfaceVariant.nui';

const variant: VariantInlineReferenceResource = {
    reference: SurfaceVariant,
};

export const SurfaceResource: ComponentImportResource = {
    type: 'component',
    name: 'Surface',
    module: '@noodles-ui/solidjs-styled',
    parts: [
        {
            name: 'Surface',
            props: {
                variant,
            },
        },
    ],
};

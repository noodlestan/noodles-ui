import {
    ComponentImportResource,
    PropInlineResource,
    VariantInlineReferenceResource,
} from '@noodles-ui/core-resources';

import { SurfaceVariant } from '../../variants/SurfaceVariant/SurfaceVariant.nui';

const variant: VariantInlineReferenceResource = {
    reference: SurfaceVariant,
};
const children: PropInlineResource = {};
const classList: PropInlineResource = {};
const style: PropInlineResource = {};

export const SurfaceResource: ComponentImportResource = {
    type: 'component',
    name: 'Surface',
    module: '@noodles-ui/solidjs-styled',
    parts: [
        {
            name: 'Surface',
            props: {
                variant,
                children,
                classList,
                style,
            },
        },
    ],
};

import { ComponentOwnResource, VariantInlineReferenceResource } from '@noodles-ui/core-resources';
import { SurfaceResource as SurfaceUnstyledResource } from '@noodles-ui/solidjs-unstyled';

import { SurfaceVariant } from '../../variants/SurfaceVariant/SurfaceVariant.nui';

const variant: VariantInlineReferenceResource = {
    reference: SurfaceVariant,
};

export const SurfaceResource: ComponentOwnResource = {
    type: 'component',
    name: 'Surface',
    module: '@noodles-ui/solidjs-styled',
    props: {
        variant,
    },
    render: {
        name: 'Surface',
        from: SurfaceUnstyledResource,
    },
};

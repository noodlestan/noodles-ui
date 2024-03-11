import { ComponentOwnResource, VariantInlineReferenceResource } from '@noodles-ui/core-types';
import { SurfaceResource as SurfaceUnstyledResource } from '@noodles-ui/core-unstyled';

import { SurfaceVariant } from '../../variants/SurfaceVariant/SurfaceVariant.nui';

const variant: VariantInlineReferenceResource = {
    reference: SurfaceVariant,
};

export const SurfaceResource: ComponentOwnResource = {
    type: 'component',
    name: 'Surface',
    module: '@noodles-ui/core-styled',
    props: {
        variant,
    },
    render: {
        name: 'Surface',
        from: SurfaceUnstyledResource,
    },
};

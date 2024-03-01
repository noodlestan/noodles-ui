import { ComponentExtendResource, VariantInlineReferenceResource } from '@noodles-ui/core-types';
import { SurfaceResource as SurfaceUnstyledResource } from '@noodles-ui/core-unstyled';

import { SurfaceVariant } from '../../variants/SurfaceVariant/SurfaceVariant.nui';

const variant: VariantInlineReferenceResource = {
    reference: SurfaceVariant,
};

export const SurfaceResource: ComponentExtendResource = {
    module: '@noodles-ui/core-styled',
    extend: SurfaceUnstyledResource,
    props: {
        variant,
    },
};

import { ComponentRenderResource, VariantExtendResource } from '@noodles-ui/core-resources';
import { HeadingResource as HeadingUnstyledResource } from '@noodles-ui/solidjs-unstyled';

import { TypeResetResource } from '../../mixins/index.nui';
import { TypographyFamilyVariants } from '../../variants/index.nui';

export const HeadingTypeVariantResource: VariantExtendResource = {
    name: 'HeadingVariant',
    module: '@noodles-ui/solidjs-styled',
    extend: TypographyFamilyVariants,
    options: ['large', 'medium'],
    defaultValue: 'large',
};

export const HeadingResource: ComponentRenderResource = {
    type: 'component',
    name: 'Heading',
    module: '@noodles-ui/solidjs-styled',
    render: {
        name: 'Heading',
        from: HeadingUnstyledResource,
    },
    use: [TypeResetResource],
    props: {
        variant: HeadingTypeVariantResource,
    },
};

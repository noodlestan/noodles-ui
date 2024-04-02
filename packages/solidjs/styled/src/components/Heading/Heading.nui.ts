import { ComponentOwnResource, VariantExtendResource } from '@noodles-ui/core-resources';
import { HeadingResource as HeadingUnstyledResource } from '@noodles-ui/solidjs-unstyled';

import { TypeResetResource } from '../../mixins/index.nui';
import { TypographyFamilyVariants } from '../../variants/index.nui';

export const HeadingTypeVariantResource: VariantExtendResource = {
    // TODO catch this error (duplicate name)
    module: '@noodles-ui/solidjs-styled',
    name: 'HeadingVariant',
    extend: TypographyFamilyVariants,
    options: ['large', 'medium'],
    defaultValue: 'large',
};

export const HeadingResource: ComponentOwnResource = {
    type: 'component',
    name: 'Heading',
    module: '@noodles-ui/solidjs-styled',
    use: [TypeResetResource],
    props: {
        variant: HeadingTypeVariantResource,
    },
    render: {
        name: 'Heading',
        from: HeadingUnstyledResource,
    },
};

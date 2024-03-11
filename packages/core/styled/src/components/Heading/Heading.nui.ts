import { ComponentOwnResource, VariantExtendResource } from '@noodles-ui/core-types';
import { HeadingResource as HeadingUnstyledResource } from '@noodles-ui/core-unstyled';

import { TypeReset } from '../../mixins/index.nui';
import { TypographyFamilyVariants } from '../../variants/index.nui';

export const HeadingTypeVariantResource: VariantExtendResource = {
    // TODO catch this error (duplicate name)
    module: '@noodles-ui/core-styled',
    name: 'HeadingVariant',
    extend: TypographyFamilyVariants,
    options: ['foo', 'bar', 'body', 'note'],
    defaultValue: 'body',
};

export const HeadingResource: ComponentOwnResource = {
    type: 'component',
    name: 'Heading',
    module: '@noodles-ui/core-styled',
    use: [TypeReset],
    props: {
        variant: HeadingTypeVariantResource,
    },
    render: {
        name: 'Heading',
        from: HeadingUnstyledResource,
    },
};

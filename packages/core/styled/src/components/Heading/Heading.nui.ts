import { ComponentExtendResource, VariantExtendResource } from '@noodles-ui/core-types';
import { HeadingResource as HeadingUnstyledResource } from '@noodles-ui/core-unstyled';

import { TypeReset } from '../../mixins/index.nui';
import { TypographyFamilyVariants } from '../../variants/index.nui';

export const HeadingTypeVariantResource: VariantExtendResource = {
    // TODO catch this error (duplicate name)
    module: '@noodles-ui/core-styled',
    name: 'TextVariant',
    extend: TypographyFamilyVariants,
    options: ['foo', 'bar', 'body', 'note'],
    defaultValue: 'body',
};

export const HeadingResource: ComponentExtendResource = {
    module: '@noodles-ui/core-styled',
    extend: HeadingUnstyledResource,
    use: [TypeReset],
    props: {
        variant: HeadingTypeVariantResource,
    },
};

import { ComponentOwnResource, VariantExtendResource } from '@noodles-ui/core-types';
import { TextResource as TextUnstyledResource } from '@noodles-ui/core-unstyled';

import { TypeReset } from '../../mixins/index.nui';
import { TypographyFamilyVariants } from '../../variants/index.nui';

export const TextTypeVariantResource: VariantExtendResource = {
    module: '@noodles-ui/core-styled',
    name: 'TextVariant',
    extend: TypographyFamilyVariants,
    options: ['large', 'medium', 'body', 'note'],
    defaultValue: 'body',
};

export const TextResource: ComponentOwnResource = {
    type: 'component',
    name: 'Text',
    module: '@noodles-ui/core-styled',
    use: [TypeReset],
    props: {
        variant: TextTypeVariantResource,
    },
    render: {
        name: 'Text',
        from: TextUnstyledResource,
    },
};

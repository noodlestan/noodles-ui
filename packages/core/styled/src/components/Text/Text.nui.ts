import { ComponentOwnResource, VariantInlineExtendResource } from '@noodles-ui/core-resources';
import { TextResource as TextUnstyledResource } from '@noodles-ui/core-unstyled';

import { TypeReset } from '../../mixins/index.nui';
import { TypographyFamilyVariants } from '../../variants/index.nui';

export const TextTypeVariantResource: VariantInlineExtendResource = {
    name: 'TextVariant',
    extend: TypographyFamilyVariants,
    options: ['large', 'medium'],
    defaultValue: 'large',
};

export const TextResource: ComponentOwnResource = {
    type: 'component',
    name: 'Text',
    module: '@noodles-ui/core-styled',
    use: [TypeReset],
    props: {
        variant: TextTypeVariantResource,
    },
    exposes: '*',
    render: {
        name: 'Text',
        from: TextUnstyledResource,
    },
};

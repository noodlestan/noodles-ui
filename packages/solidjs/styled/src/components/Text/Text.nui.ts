import { ComponentOwnResource, VariantInlineExtendResource } from '@noodles-ui/core-resources';
import { TextResource as TextUnstyledResource } from '@noodles-ui/solidjs-unstyled';

import { TypeResetResource } from '../../mixins/index.nui';
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
    module: '@noodles-ui/solidjs-styled',
    use: [TypeResetResource],
    props: {
        variant: TextTypeVariantResource,
    },
    exposes: '*',
    render: {
        name: 'Text',
        from: TextUnstyledResource,
    },
};

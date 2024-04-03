import { ComponentRenderResource, VariantInlineExtendResource } from '@noodles-ui/core-resources';
import { TextResource as TextUnstyledResource } from '@noodles-ui/solidjs-unstyled';

import { TypeResetResource } from '../../mixins/index.nui';
import { TypographyFamilyVariants } from '../../variants/index.nui';

export const TextTypeVariantResource: VariantInlineExtendResource = {
    name: 'TextVariant',
    extend: TypographyFamilyVariants,
    options: ['large', 'medium'],
    defaultValue: 'large',
};

export const TextResource: ComponentRenderResource = {
    type: 'component',
    name: 'Text',
    module: '@noodles-ui/solidjs-styled',
    render: {
        name: 'Text',
        from: TextUnstyledResource,
    },
    use: [TypeResetResource],
    exposes: '*',
    props: {
        variant: TextTypeVariantResource,
    },
};

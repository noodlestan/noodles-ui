import { ComponentExtendResource, VariantInlineExtendResource } from '@noodles-ui/core-types';
import { HeadingResource as HeadingUnstyledResource } from '@noodles-ui/core-unstyled';

import { TypeReset } from '../../mixins/index.nui';
import { ContentColor, TypeVariant } from '../../variants/index.nui';

const variant: VariantInlineExtendResource = {
    extend: [
        TypeVariant,
        {
            type: 'TextVariant',
            family: 'heading',
        },
    ],
    options: ['large', 'medium', 'body', 'note'],
    defaultOption: 'body',
};

const color: VariantInlineExtendResource = {
    extend: ContentColor,
};

export const HeadingResource: ComponentExtendResource = {
    module: '@noodles-ui/core-styled',
    extend: HeadingUnstyledResource,
    uses: [TypeReset],
    props: {
        variant,
        color,
    },
};

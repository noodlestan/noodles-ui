import { ComponentResource, VariantInlineExtendResource } from '@noodles-ui/core-types';
import { TextResource as TextUnstyledResource } from '@noodles-ui/core-unstyled';

import { TypeReset } from '../../mixins/index.nui';
import { ContentColor, TypeVariant } from '../../variants/index.nui';

const variant: VariantInlineExtendResource = {
    extend: [
        TypeVariant,
        {
            type: 'TextVariant',
            family: 'text',
        },
    ],
    options: ['large', 'medium', 'body', 'note'],
    defaultOption: 'body',
};

const color: VariantInlineExtendResource = {
    extend: ContentColor,
};

export const TextResource: ComponentResource = {
    module: '@noodles-ui/core-styled',
    extend: TextUnstyledResource,
    uses: [TypeReset],
    props: {
        variant,
        color,
    },
};

import {
    ComponentExtendResource,
    VariantExtendResource,
    VariantInlineExtendResource,
} from '@noodles-ui/core-types';
import { HeadingResource as HeadingUnstyledResource } from '@noodles-ui/core-unstyled';

import { TypeReset } from '../../mixins/index.nui';
import { ContentColor, TypeVariant } from '../../variants/index.nui';

export const HeadingTypeVariantResource: VariantExtendResource = {
    // TODO catch this error (duplicate name)
    module: '@noodles-ui/core-styled',
    name: 'TextVariant',
    extend: [
        TypeVariant,
        {
            family: 'heading',
        },
    ],
    options: ['foo', 'bar', 'body', 'note'],
    defaultOption: 'body',
};

const color: VariantInlineExtendResource = {
    extend: [ContentColor, { group: 'placeholder' }],
};

export const HeadingResource: ComponentExtendResource = {
    module: '@noodles-ui/core-styled',
    extend: HeadingUnstyledResource,
    uses: [TypeReset],
    props: {
        variant: HeadingTypeVariantResource,
        color,
    },
};

import {
    ComponentResource,
    VariantExtendResource,
    VariantInlineExtendResource,
} from '@noodles-ui/core-types';
import { TextResource as TextUnstyledResource } from '@noodles-ui/core-unstyled';

import { TypeReset } from '../../mixins/index.nui';
import { ContentColor, TypeVariant } from '../../variants/index.nui';

export const TextTypeVariantResource: VariantExtendResource = {
    module: '@noodles-ui/core-styled',
    name: 'TextVariant',
    extend: [
        TypeVariant,
        {
            family: 'text',
        },
    ],
    composable: true,
    params: [],
    options: ['large', 'medium', 'body', 'note'],
    defaultOption: 'body',
};

const color: VariantInlineExtendResource = {
    extend: [ContentColor, { group: 'placeholder' }],
};

export const TextResource: ComponentResource = {
    module: '@noodles-ui/core-styled',
    extend: TextUnstyledResource,
    uses: [TypeReset],
    props: {
        variant: TextTypeVariantResource,
        color,
    },
};

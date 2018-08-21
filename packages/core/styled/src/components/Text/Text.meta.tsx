import { TextMeta as TextUnstyledMeta } from '@noodles-ui/core-unstyled';

import { TypeReset } from '../../mixins';
import { ContentColor, TypeVariant } from '../../variants';

import { Text as Component } from './Text';

export const TextMeta = {
    type: 'component',
    name: 'Text',
    extend: TextUnstyledMeta,
    component: Component,
    uses: [TypeReset],
    props: {
        variant: {
            uses: TypeVariant,
            params: { type: 'TextVariant', family: 'text' },
            customise: {
                options: ['large', 'medium', 'body', 'note'],
                defaultOption: 'body',
            },
        },
        color: {
            use: ContentColor,
        },
    },
};

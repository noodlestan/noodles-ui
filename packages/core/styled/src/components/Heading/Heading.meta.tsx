import { HeadingMeta as HeadingStyledMeta } from '@noodles-ui/core-unstyled';

import { TypeReset } from '../../mixins';
import { ContentColor, TypeVariant } from '../../variants';

import { Heading as Component } from './Heading';

export const HeadingMeta = {
    type: 'component',
    name: 'Heading',
    extend: HeadingStyledMeta,
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

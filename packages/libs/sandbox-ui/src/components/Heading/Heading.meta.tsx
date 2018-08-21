import { HeadingMeta as HeadingStyledMeta } from '@noodles-ui/core-styled';

import { Heading as Component } from '../../generated/component.Heading';

export const HeadingMeta = {
    type: 'component',
    name: 'Heading',
    extend: HeadingStyledMeta,
    component: Component,
    props: {
        variant: {
            options: ['large', 'small'],
            defaultOption: 'large',
        },
    },
};

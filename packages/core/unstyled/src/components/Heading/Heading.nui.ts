import { ComponentResource } from '@noodles-ui/core-types';

export const HeadingResource: ComponentResource = {
    type: 'component',
    name: 'Heading',
    module: '@noodles-ui/core-unstyled',
    props: {
        tag: {
            type: 'prop',
            options: ['h1', 'h2', 'h3', 'h4', 'p', 'span'],
        },
    },
};

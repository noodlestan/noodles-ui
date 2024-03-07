import { ComponentResource } from '@noodles-ui/core-types';

export const HeadingResource: ComponentResource = {
    type: 'component',
    name: 'Heading',
    module: '@noodles-ui/core-unstyled',
    props: {
        tag: {
            type: 'variant',
            name: 'HeadingTag',
            options: ['h1', 'h2', 'h3', 'h4', 'p', 'span'],
        },
    },
};

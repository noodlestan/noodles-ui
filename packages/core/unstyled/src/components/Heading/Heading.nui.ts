import { ComponentResource } from '@noodles-ui/core-types';

export const HeadingResource: ComponentResource = {
    type: 'component',
    name: 'Heading',
    props: {
        tag: {
            type: 'prop:list',
            options: ['h1', 'h2', 'h3', 'h4', 'p', 'span'],
        },
    },
};

import { Heading as Component } from './Heading';

export const HeadingMeta = {
    type: 'component',
    name: 'Heading',
    component: Component,
    props: {
        tag: {
            options: ['h1', 'h2', 'h3', 'h4', 'p', 'span'],
        },
    },
};

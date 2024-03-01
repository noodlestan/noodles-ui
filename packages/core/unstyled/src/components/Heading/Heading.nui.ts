import { ComponentResource, PropInlineResource } from '@noodles-ui/core-types';

const tag: PropInlineResource = {
    type: 'prop',
    options: ['h1', 'h2', 'h3', 'h4', 'p', 'span'],
};

export const HeadingResource: ComponentResource = {
    type: 'component',
    name: 'Heading',
    module: '@noodles-ui/core-unstyled',
    props: {
        tag,
    },
};

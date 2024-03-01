import { ComponentResource, PropInlineResource } from '@noodles-ui/core-types';

const tag: PropInlineResource = {
    type: 'prop:list',
    options: ['p'],
    defaultOption: 'p',
};

export const TextResource: ComponentResource = {
    type: 'component',
    name: 'Text',
    module: '@noodles-ui/core-unstyled',
    props: {
        tag,
    },
};

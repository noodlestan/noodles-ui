import { TextResource as TextStyledResource } from '@noodles-ui/core-styled';
import { ComponentExtendResource } from '@noodles-ui/core-types';

export const TextResource: ComponentExtendResource = {
    module: '@noodles-ui/sandbox-ui',
    extend: [TextStyledResource, { family: 'text' }],
    exposes: ['tag', 'children'],
    props: {
        variantx: {
            type: 'variant',
            name: 'TextVariant',
            options: ['small', 'medium', 'large', 'x-large'],
            defaultOption: 'medium',
        },
    },
    overrides: {
        tag: {
            name: 'TextTag',
            options: ['p', 'div', 'span'],
            defaultOption: 'span',
        },
        variant: {
            name: 'TextVariant',
            options: ['small', 'medium', 'large', 'x-large'],
            defaultOption: 'medium',
        },
    },
};

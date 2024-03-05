import { TextResource as TextStyledResource } from '@noodles-ui/core-styled';
import { ComponentExtendResource } from '@noodles-ui/core-types';

export const TextResource: ComponentExtendResource = {
    module: '@noodles-ui/sandbox-ui',
    extend: [TextStyledResource, { family: 'text' }],
    hides: {},
    overrides: {
        variant: {
            options: ['small', 'medium', 'large', 'x-large'],
            defaultOption: 'medium',
        },
        tag: {
            options: ['p', 'div', 'span'],
            defaultOption: 'span',
        },
    },
};

import { TextResource as TextStyledResource } from '@noodles-ui/core-styled';
import { ComponentExtendResource } from '@noodles-ui/core-types';

export const TextResource: ComponentExtendResource = {
    module: '@noodles-ui/lab-ui',
    extend: TextStyledResource,
    hides: {
        classList: {},
        style: {},
    },
    overrides: {
        variant: {
            name: 'TextVariant',
            options: ['large', 'medium', 'body', 'note'],
            defaultValue: 'medium',
        },
        tag: {
            name: 'TextTag',
            options: ['p', 'span'],
        },
    },
    vars: {
        family: 'text',
    },
};

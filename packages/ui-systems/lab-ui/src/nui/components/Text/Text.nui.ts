import { ComponentExtendResource } from '@noodles-ui/core-resources';
import { TextResource as TextStyledResource } from '@noodles-ui/solidjs-styled';

export const TextResource: ComponentExtendResource = {
    type: 'component',
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

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
            options: ['small', 'medium', 'large', 'x-large'],
            defaultValue: 'medium',
        },
        tag: {
            name: 'TextTag',
            options: ['p', 'span', 'li'],
        },
    },
};

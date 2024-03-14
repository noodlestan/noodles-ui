import { HeadingResource as HeadingStyledResource } from '@noodles-ui/core-styled';
import { ComponentExtendResource } from '@noodles-ui/core-types';

export const HeadingResource: ComponentExtendResource = {
    module: '@noodles-ui/lab-ui',
    extend: HeadingStyledResource,
    hides: {
        classList: {},
        style: {},
    },
    overrides: {
        variant: {
            name: 'HeadingVariant',
            options: ['large', 'small'],
            vars: { family: 'heading' },
            defaultValue: 'large',
        },
        tag: {
            name: 'HeadingTag',
            options: ['h1', 'h2', 'h3'],
        },
    },
};

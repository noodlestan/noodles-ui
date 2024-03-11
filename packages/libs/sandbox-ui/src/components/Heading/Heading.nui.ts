import { HeadingResource as HeadingStyledResource } from '@noodles-ui/core-styled';
import { ComponentResource } from '@noodles-ui/core-types';

export const HeadingResource: ComponentResource = {
    module: '@noodles-ui/sandbox-ui',
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

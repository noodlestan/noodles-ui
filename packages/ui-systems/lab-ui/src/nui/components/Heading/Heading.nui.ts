import { ComponentExtendResource } from '@noodles-ui/core-resources';
import { HeadingResource as HeadingStyledResource } from '@noodles-ui/core-styled';

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
            options: ['page', 'section', 'group', 'item'],
            defaultValue: 'page',
        },
        tag: {
            name: 'HeadingTag',
            options: ['h1', 'h2', 'h3'],
            defaultValue: 'h3',
        },
    },
    vars: {
        family: 'heading',
    },
};

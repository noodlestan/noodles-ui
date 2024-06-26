import { ComponentExtendResource } from '@noodles-ui/core-resources';
import { HeadingResource as HeadingStyledResource } from '@noodles-ui/solidjs-styled';

export const HeadingResource: ComponentExtendResource = {
    type: 'component',
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

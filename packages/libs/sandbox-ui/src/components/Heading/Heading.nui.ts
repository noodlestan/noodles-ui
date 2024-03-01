import { HeadingResource as HeadingStyledResource } from '@noodles-ui/core-styled';
import { ComponentResource, VariantInlineResource } from '@noodles-ui/core-types';

const variant: VariantInlineResource = {
    type: 'variant',
    options: ['large', 'small'],
    defaultOption: 'large',
};

export const HeadingResource: ComponentResource = {
    module: '@noodles-ui/sandbox-ui',
    extend: HeadingStyledResource,
    overrides: {
        variant,
    },
};

import { HeadingResource as HeadingStyledResource } from '@noodles-ui/core-styled';
import { ComponentResource } from '@noodles-ui/core-types';

export const HeadingResource: ComponentResource = {
    module: '@noodles-ui/sandbox-ui',
    extend: HeadingStyledResource,
    override: {
        variant: {
            options: ['large', 'small'],
            defaultOption: 'large',
        },
    },
};

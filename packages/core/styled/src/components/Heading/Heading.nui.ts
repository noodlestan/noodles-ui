import { ComponentResource } from '@noodles-ui/core-types';
import { HeadingResource as HeadingUnstyledResource } from '@noodles-ui/core-unstyled';

import { TypeReset } from '../../mixins/index.nui';
import { ContentColor, TypeVariant } from '../../variants/index.nui';

export const HeadingResource: ComponentResource = {
    module: '@noodles-ui/core-styled',
    extend: HeadingUnstyledResource,
    uses: [TypeReset],
    expose: {
        variant: {
            extend: [
                TypeVariant,
                {
                    params: { type: 'TextVariant', family: 'heading' },
                },
            ],
            options: ['large', 'medium', 'body', 'note'],
            defaultOption: 'body',
        },
        color: {
            extend: ContentColor,
        },
    },
};

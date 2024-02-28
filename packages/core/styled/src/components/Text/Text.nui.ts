import { ComponentResource } from '@noodles-ui/core-types';
import { TextResource as TextUnstyledResource } from '@noodles-ui/core-unstyled';

import { TypeReset } from '../../mixins/index.nui';
import { ContentColor, TypeVariant } from '../../variants/index.nui';

export const TextResource: ComponentResource = {
    module: '@noodles-ui/core-styled',
    extend: TextUnstyledResource,
    uses: [TypeReset],
    expose: {
        variant: {
            extend: [
                TypeVariant,
                {
                    params: { type: 'TextVariant', family: 'text' },
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

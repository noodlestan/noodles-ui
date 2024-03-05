import {
    TextResource as TextStyledResource,
    TextTypeVariantResource,
} from '@noodles-ui/core-styled';
import { ComponentResource } from '@noodles-ui/core-types';

export const TextResource: ComponentResource = {
    module: '@noodles-ui/sandbox-ui',
    extend: TextStyledResource,
    replaces: {
        variant: {
            extend: TextTypeVariantResource,
            options: ['small', 'medium', 'large', 'x-large'],
            defaultOption: 'medium',
        },
    },
};

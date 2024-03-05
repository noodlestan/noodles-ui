import { VariantResource } from '@noodles-ui/core-types';

import { FgColor } from '../FgColor/FgColor.nui';

export const ContentColor: VariantResource = {
    name: 'ContentColor',
    module: '@noodles-ui/core-styled',
    composable: true,
    extend: [
        FgColor,
        {
            group: 'content',
        },
    ],
    options: ['primary', 'muted', 'disabled'],
    defaultOption: 'primary',
};

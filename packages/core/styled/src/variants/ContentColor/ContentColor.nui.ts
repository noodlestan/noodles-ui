import { VariantResource } from '@noodles-ui/core-types';

import { FgColor } from '../FgColor/FgColor.nui';

export const ContentColor: VariantResource = {
    extend: [
        FgColor,
        {
            params: { group: 'content' },
        },
    ],
    name: 'ContentColor',
    options: ['primary', 'muted', 'disabled'],
    defaultOption: 'primary',
};

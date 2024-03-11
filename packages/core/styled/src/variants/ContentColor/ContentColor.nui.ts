import { VariantResource } from '@noodles-ui/core-types';

import { FgColor } from '../FgColor/FgColor.nui';

export const ContentColor: VariantResource = {
    name: 'ContentColor',
    module: '@noodles-ui/core-styled',
    extend: FgColor,
    options: ['primary', 'muted', 'disabled'],
    defaultValue: 'primary',
};

import { VariantExtendResource } from '@noodles-ui/core-types';

import { FgColor } from '../FgColor/FgColor.nui';

export const ContentColor: VariantExtendResource = {
    name: 'ContentColor',
    module: '@noodles-ui/core-styled',
    extend: FgColor,
    options: ['primary', 'muted', 'disabled'],
    defaultValue: 'primary',
};

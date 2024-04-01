import { VariantExtendResource } from '@noodles-ui/core-resources';

import { FgColor } from '../FgColor/FgColor.nui';

export const ContentColor: VariantExtendResource = {
    name: 'ContentColor',
    module: '@noodles-ui/solidjs-styled',
    extend: FgColor,
    options: ['primary', 'muted', 'disabled'],
    defaultValue: 'primary',
};

import { ThemeResource } from '@noodles-ui/core-types';

import { HelloThemeResource } from '../HelloTheme/HelloTheme.nui';

export const GoodbyeThemeResource: ThemeResource = {
    type: 'theme',
    name: 'goodbye',
    module: '@noodles-ui/lab-ui',
    extend: [HelloThemeResource],
    mode: 'dark',
};

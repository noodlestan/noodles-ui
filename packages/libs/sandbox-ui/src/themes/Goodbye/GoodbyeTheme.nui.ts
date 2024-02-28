import { ThemeResource } from '@noodles-ui/core-types';

import { HelloTeamResource } from '../Hello/HelloTheme.nui';

export const GoodbyeTeamResource: ThemeResource = {
    type: 'theme',
    name: 'goodbye',
    module: '@noodles-ui/sandbox-ui',
    extend: [HelloTeamResource],
    mode: 'dark',
};

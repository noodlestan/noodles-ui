import { ThemeResource } from '@noodles-ui/core-types';

import { HelloTeamResource } from '../Hello/HelloTheme.nui';

export const GoodbyeTeamResource: ThemeResource = {
    name: 'goodbye',
    extend: [HelloTeamResource],
    mode: 'dark',
};

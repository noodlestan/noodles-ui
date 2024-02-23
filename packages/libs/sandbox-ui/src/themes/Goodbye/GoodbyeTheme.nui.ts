import { ThemeResource } from '@noodles-ui/core-types';

import tokens from '../../generated/theme.Goodbye.tokens';
import { HelloTeamResource } from '../Hello/HelloTheme.nui';

export const GoodbyeTeamResource: ThemeResource = {
    name: 'goodbye',
    extends: [HelloTeamResource],
    mode: 'dark',
    tokens,
};

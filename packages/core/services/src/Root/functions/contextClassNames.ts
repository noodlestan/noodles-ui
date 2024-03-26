import { NUI_PREFIX } from '@noodles-ui/core-types';

import { colourSchemeClassNames } from '../_private/functions/colourSchemeClassNames';
import { surfaceClassNames } from '../_private/functions/surfaceClassNames';
import { themeClassNames } from '../_private/functions/themeClassNames';

export const contextClassNames = (): string[] => {
    return [NUI_PREFIX, ...colourSchemeClassNames(), ...themeClassNames(), ...surfaceClassNames()];
};

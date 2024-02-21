import { colourSchemeClassNames } from '../_private/functions/colourSchemeClassNames';
import { surfaceClassNames } from '../_private/functions/surfaceClassNames';
import { themeClassNames } from '../_private/functions/themeClassNames';
import { NOODLES_PREFIX } from '../constants';

export const contextClassNames = (): string[] => {
    return [
        NOODLES_PREFIX,
        ...colourSchemeClassNames(),
        ...themeClassNames(),
        ...surfaceClassNames(),
    ];
};

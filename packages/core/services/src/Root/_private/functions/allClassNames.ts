import { NOODLES_PREFIX } from '../../constants';

import { colourSchemeClassNames } from './colourSchemeClassNames';
import { surfaceClassNames } from './surfaceClassNames';
import { themeClassNames } from './themeClassNames';

export const allClassNames = (): string[] => {
    return [
        NOODLES_PREFIX,
        ...colourSchemeClassNames(),
        ...themeClassNames(),
        ...surfaceClassNames(),
    ];
};

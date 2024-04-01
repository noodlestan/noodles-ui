import { NUI_COLOUR_SCHEME_PREFIX, makeNoodlesClassName } from '@noodles-ui/core-types';

import { useColourSchemeContext } from '../../providers/ColourSchemeProvider';

export const colourSchemeClassNames = (): string[] => {
    const { colourScheme } = useColourSchemeContext();
    return [makeNoodlesClassName(NUI_COLOUR_SCHEME_PREFIX, colourScheme())];
};

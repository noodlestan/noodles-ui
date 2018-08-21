import { useColourSchemeContext } from '../../providers/ColourSchemeProvider';

import { makeNoodlesClassName } from './makeNoodlesClassName';

export const colourSchemeClassNames = (): string[] => {
    const { colourScheme } = useColourSchemeContext();
    const className = colourScheme() === 'dark' ? 'ColourScheme-dark' : 'ColourScheme-light';
    return [makeNoodlesClassName(className)];
};

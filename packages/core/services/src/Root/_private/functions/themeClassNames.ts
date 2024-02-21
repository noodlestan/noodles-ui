import { THEME_PREFIX } from '../../constants';
import { useThemeContext } from '../../providers/ThemeProvider';
import { Theme } from '../../types';

import { makeNoodlesClassName } from './makeNoodlesClassName';

const themeNames = (theme: Theme): string[] => {
    return [theme.name, ...theme.extends.flatMap(t => themeNames(t))];
};

export const themeClassNames = (): string[] => {
    const { theme } = useThemeContext();

    return themeNames(theme()).map(t => makeNoodlesClassName(THEME_PREFIX, t));
};

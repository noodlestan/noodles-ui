import { THEME_PREFIX } from '../../constants';
import { useThemeContext } from '../../providers/ThemeProvider';
import { themesStore } from '../../stores/themesStore';
import { Theme } from '../../types';

import { makeNoodlesClassName } from './makeNoodlesClassName';

const themeNames = (theme: Theme): string[] => {
    const { findTheme } = themesStore;

    return [theme.name, ...theme.extends.flatMap(t => themeNames(findTheme(t)))];
};

export const themeClassNames = (): string[] => {
    const { theme } = useThemeContext();

    return [
        makeNoodlesClassName(THEME_PREFIX),
        ...themeNames(theme()).map(t => makeNoodlesClassName(THEME_PREFIX, t)),
    ];
};

import { THEME_PREFIX } from '../../constants';
import { useThemeContext } from '../../providers/ThemeProvider';
import { themesStore } from '../../stores';
import { Theme } from '../../types';

import { makeNoodlesClassName } from './makeNoodlesClassName';

const themeNames = (theme: Theme): string[] => {
    const { themeByName } = themesStore;

    return [theme.name, ...theme.extend.flatMap(t => themeNames(themeByName(t)))];
};

export const themeClassNames = (): string[] => {
    const { theme } = useThemeContext();

    return themeNames(theme()).map(t => makeNoodlesClassName(THEME_PREFIX, t));
};

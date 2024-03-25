import { NUI_THEME_PREFIX, makeNoodlesClassName } from '@noodles-ui/core-types';

import { useThemeContext } from '../../providers/ThemeProvider';
import { themesStore } from '../../stores';
import { Theme } from '../../types';

const themeNames = (theme: Theme): string[] => {
    const { themeByName } = themesStore;

    return [theme.name, ...theme.extend.flatMap(t => themeNames(themeByName(t)))];
};

export const themeClassNames = (): string[] => {
    const { theme } = useThemeContext();
    return themeNames(theme()).map(t => makeNoodlesClassName(NUI_THEME_PREFIX, t));
};

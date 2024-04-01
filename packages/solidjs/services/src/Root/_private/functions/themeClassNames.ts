import { NUI_THEME_PREFIX, Theme, makeNoodlesClassName } from '@noodles-ui/core-types';

import { useThemeContext } from '../../providers/ThemeProvider';
import { themesStore } from '../../stores';

const themeNames = (theme: Theme): string[] => {
    const { themeByName } = themesStore;

    return [theme.name, ...theme.extend.flatMap(theme => themeNames(themeByName(theme)))];
};

export const themeClassNames = (): string[] => {
    const { theme } = useThemeContext();
    return themeNames(theme()).map(t => makeNoodlesClassName(NUI_THEME_PREFIX, t));
};

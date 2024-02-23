import { ThemeResource } from '@noodles-ui/core-types';

import { THEME_PREFIX } from '../../constants';
import { useThemeContext } from '../../providers/ThemeProvider';

import { makeNoodlesClassName } from './makeNoodlesClassName';

const themeNames = (theme: ThemeResource): string[] => {
    return [theme.name, ...theme.extends.flatMap(t => themeNames(t))];
};

export const themeClassNames = (): string[] => {
    const { theme } = useThemeContext();

    return themeNames(theme()).map(t => makeNoodlesClassName(THEME_PREFIX, t));
};

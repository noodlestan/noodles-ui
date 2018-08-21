import { Accessor, createSignal } from 'solid-js';

import { ThemesError } from '../errors/ThemesError';
import { Theme } from '../types';

const [themes, setThemes] = createSignal<Theme[]>([]);

type ThemesStore = {
    themes: Accessor<Theme[]>;
    registerTheme: (theme: Theme) => void;
    findTheme: (name: string) => Theme;
};

const themeByName = (name: string): Theme | undefined => themes().find(t => t.name === name);

const findTheme = (name: string): Theme => {
    const found = themeByName(name);
    if (!found) {
        throw new ThemesError(`Unknown theme "${name}".`);
    }
    return found;
};

const registerTheme = (theme: Theme): void => {
    if (!themeByName(theme.name)) {
        setThemes(t => [...t, theme]);
    }
};

export const themesStore: ThemesStore = {
    themes,
    registerTheme,
    findTheme,
};

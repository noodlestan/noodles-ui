import { Theme } from '@noodles-ui/core-types';
import { Accessor, createSignal } from 'solid-js';

import { ThemesError } from '../errors/ThemesError';

const [themes, setThemes] = createSignal<Theme[]>([]);

type ThemesStore = {
    themes: Accessor<Theme[]>;
    registerTheme: (theme: Theme) => void;
    themeByName: (name: string) => Theme;
};

const findTheme = (name: string): Theme | undefined => {
    return themes().find(theme => theme.name === name);
};

const themeByName = (name: string): Theme => {
    const found = findTheme(name);
    if (!found) {
        throw new ThemesError(`Unknown theme "${name}".`);
    }
    return found;
};

const registerTheme = (theme: Theme): void => {
    if (!findTheme(theme.name)) {
        setThemes(t => [...t, theme]);
    }
};

export const themesStore: ThemesStore = {
    themes,
    registerTheme,
    themeByName,
};

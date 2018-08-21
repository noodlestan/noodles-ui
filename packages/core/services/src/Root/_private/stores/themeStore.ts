import { Accessor, createSignal } from 'solid-js';

import { themesStore } from '../../stores';
import { Theme } from '../../types';

const [theme, setTheme] = createSignal<string>('');

type ThemeStore = {
    theme: Accessor<Theme>;
    setTheme: (name: string) => void;
};

const { findTheme } = themesStore;

export const themeStore: ThemeStore = {
    theme: () => findTheme(theme()),
    setTheme: (name: string) => {
        findTheme(name);
        setTheme(name);
    },
};

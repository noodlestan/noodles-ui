import { Theme } from '@noodles-ui/core-types';
import { Accessor, createSignal } from 'solid-js';

import { themesStore } from '../../stores';

const [theme, setTheme] = createSignal<string>('');

type ThemeStore = {
    theme: Accessor<Theme>;
    setTheme: (name: string) => void;
};

const { themeByName } = themesStore;

export const themeStore: ThemeStore = {
    theme: () => themeByName(theme()),
    setTheme: (name: string) => {
        themeByName(name);
        setTheme(name);
    },
};

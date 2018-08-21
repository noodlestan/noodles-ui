import { Component, createContext, splitProps, useContext } from 'solid-js';

import {
    ClassNamesElement,
    ClassNamesElementProps,
} from '../../_private/components/ClassNamesElement';
import { ThemesError } from '../../errors';
import { themesStore } from '../../stores/themesStore';
import { Theme } from '../../types';

type ThemeContextState = { theme: () => Theme };

export const ThemeContext = createContext<ThemeContextState>();

export const useThemeContext = (): ThemeContextState => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new ThemesError(`No ThemeContext found`);
    }
    return context;
};

type ThemeProviderProps = ClassNamesElementProps & {
    theme: string;
    shallow?: boolean;
};

export const ThemeProvider: Component<ThemeProviderProps> = props => {
    const [local, rest] = splitProps(props, ['theme']);

    const { findTheme } = themesStore;

    const value = () => ({ theme: () => findTheme(local.theme) });

    return (
        <ThemeContext.Provider value={value()}>
            {props.shallow ? props.children : <ClassNamesElement {...rest} />}
        </ThemeContext.Provider>
    );
};

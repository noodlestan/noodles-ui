import { Component, JSX, createContext, useContext } from 'solid-js';

import { ThemesError } from '../../errors';
import { themesStore } from '../../stores/themesStore';
import { Theme } from '../../types';
import { TokensProvider } from '../TokensProvider';

type ThemeContextState = { theme: () => Theme };

export const ThemeContext = createContext<ThemeContextState>();

export const useThemeContext = (): ThemeContextState => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new ThemesError(`No ThemeContext found`);
    }
    return context;
};

type ThemeProviderProps = {
    children?: JSX.Element;
    theme: string;
    shallow?: boolean;
};

export const ThemeProvider: Component<ThemeProviderProps> = props => {
    const { themeByName } = themesStore;

    const value = () => ({ theme: () => themeByName(props.theme) });

    // TODO for themes to be nestable

    return (
        <ThemeContext.Provider value={value()}>
            {props.shallow ? props.children : <TokensProvider>{props.children}</TokensProvider>}
        </ThemeContext.Provider>
    );
};

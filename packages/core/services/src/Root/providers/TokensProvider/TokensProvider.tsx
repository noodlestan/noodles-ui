import { Component, JSX, createContext, useContext } from 'solid-js';

import { ThemesError } from '../../errors';
import { contextTokens } from '../../functions/contextTokens';
import { TokenMap } from '../../types';
import { useColourSchemeContext } from '../ColourSchemeProvider';
import { useSurfacesContext } from '../SurfaceProvider';
import { useThemeContext } from '../ThemeProvider';

type TokensContextState = { tokens: TokenMap };

export const TokensContext = createContext<TokensContextState>();

export const useTokensContext = (): TokensContextState => {
    const context = useContext(TokensContext);
    if (!context) {
        throw new ThemesError(`No TokensContext found`);
    }
    return context;
};

type TokensProviderProps = {
    children: JSX.Element;
};

export const TokensProvider: Component<TokensProviderProps> = props => {
    const tokens = () => {
        const { colourScheme } = useColourSchemeContext();
        const { theme } = useThemeContext();
        const { surface } = useSurfacesContext();
        return contextTokens(colourScheme(), theme(), surface());
    };

    const value = () => ({ tokens: tokens() });

    return <TokensContext.Provider value={value()}>{props.children}</TokensContext.Provider>;
};

import { ColourSchemeName } from '@noodles-ui/core-types';
import { Accessor, Component, JSX, createContext, createEffect, useContext } from 'solid-js';

import { colourSchemeStore } from '../../_private/stores/colourSchemeStore';
import { ThemesError } from '../../errors';

type ColourSchemeContextState = {
    colourScheme: Accessor<ColourSchemeName>;
    setColourScheme: (name: ColourSchemeName) => void;
};

export const ColourSchemeContext = createContext<ColourSchemeContextState>(
    {} as ColourSchemeContextState,
);

export const useColourSchemeContext = (): ColourSchemeContextState => {
    const context = useContext(ColourSchemeContext);
    if (!context) {
        throw new ThemesError(`No ColourSchemeContext found`);
    }
    return context;
};

type ColourSchemeProviderProps = {
    children: JSX.Element;
    colourScheme?: ColourSchemeName;
};

export const ColourSchemeProvider: Component<ColourSchemeProviderProps> = props => {
    const { colourScheme, setColourScheme } = colourSchemeStore;
    const context: ColourSchemeContextState = {
        colourScheme,
        setColourScheme: name => setColourScheme(name),
    };

    createEffect(() => {
        if (props.colourScheme) {
            setColourScheme(props.colourScheme);
        }
    });

    return (
        <ColourSchemeContext.Provider value={context}>
            {props.children}
        </ColourSchemeContext.Provider>
    );
};

import { ColourSchemeName } from '@noodles-ui/core-types';
import { Component, JSX, createSignal, useContext } from 'solid-js';

import { SystemUIContext } from './private/SystemUIContext';
import { SystemUIContextState } from './types';

export const createSystemUIContext = (initialTheme: string): SystemUIContextState => {
    const initialColourScheme = (): ColourSchemeName => 'dark';
    // // window !== undefined && window.matchMedia('(prefers-color-scheme: dark)')
    //   'dark'
    // : 'light';
    // makePersisted()
    const [colourScheme, setColourScheme] = createSignal<ColourSchemeName>(initialColourScheme());
    // makePersisted()
    const [theme, setTheme] = createSignal<string>(initialTheme);

    return {
        colourScheme,
        setColourScheme,
        theme,
        setTheme,
    };
};

type SystemUIProviderProps = SystemUIContextState & {
    children?: JSX.Element;
};

export const SystemUIProvider: Component<SystemUIProviderProps> = props => {
    return <SystemUIContext.Provider value={props}>{props.children}</SystemUIContext.Provider>;
};

export const useSystemUIContext = (): SystemUIContextState => useContext(SystemUIContext);

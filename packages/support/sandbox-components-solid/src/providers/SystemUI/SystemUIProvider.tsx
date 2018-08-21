import { ColourSchemeName } from '@noodles-ui/core-services';
import { Component, JSX, createSignal, useContext } from 'solid-js';

import { SystemUIContext } from './private/SystemUIContext';
import { SystemUIContextState } from './types';

export const createSystemUIContext = (initialTheme: string): SystemUIContextState => {
    const initialColourScheme = (): ColourSchemeName => 'dark';
    // // window !== undefined && window.matchMedia('(prefers-color-scheme: dark)')
    //   'dark'
    // : 'light';
    const [colourScheme, setColourScheme] = // makePersisted(
        // eslint-disable-next-line solid/reactivity
        createSignal<ColourSchemeName>(initialColourScheme());
    const [theme, setTheme] = // makePersisted(
        // eslint-disable-next-line solid/reactivity
        createSignal<string>(initialTheme);

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

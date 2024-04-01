import { Surface } from '@noodles-ui/core-types';
import { Component, JSX, createContext, useContext } from 'solid-js';

import { ThemesError } from '../../errors';
import { surfacesStore } from '../../stores/surfacesStore';
import { TokensProvider } from '../TokensProvider';

type SurfaceContextState = { surface: () => Surface };

export const SurfaceContext = createContext<SurfaceContextState>();

export const useSurfacesContext = (): SurfaceContextState => {
    const context = useContext(SurfaceContext);
    if (!context) {
        throw new ThemesError(`No SurfaceContext found`);
    }
    return context;
};

type SurfaceProviderProps = {
    children?: JSX.Element;
    surface: string;
    shallow?: boolean;
};

export const SurfaceProvider: Component<SurfaceProviderProps> = props => {
    const { surfaceByName } = surfacesStore;

    const value = () => ({ surface: () => surfaceByName(props.surface) });

    return (
        <SurfaceContext.Provider value={value()}>
            {props.shallow ? props.children : <TokensProvider>{props.children}</TokensProvider>}
        </SurfaceContext.Provider>
    );
};

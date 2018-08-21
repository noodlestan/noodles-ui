import { Component, createContext, splitProps, useContext } from 'solid-js';

import {
    ClassNamesElement,
    ClassNamesElementProps,
} from '../../_private/components/ClassNamesElement';
import { ThemesError } from '../../errors';
import { surfacesStore } from '../../stores/surfacesStore';
import { Surface } from '../../types';

type SurfaceContextState = { surface: () => Surface };

export const SurfaceContext = createContext<SurfaceContextState>();

export const useSurfacesContext = (): SurfaceContextState => {
    const context = useContext(SurfaceContext);
    if (!context) {
        throw new ThemesError(`No SurfaceContext found`);
    }
    return context;
};

type SurfaceProviderProps = ClassNamesElementProps & {
    surface: string;
    shallow?: boolean;
};

export const SurfaceProvider: Component<SurfaceProviderProps> = props => {
    const [local, rest] = splitProps(props, ['surface']);

    const { findSurface } = surfacesStore;

    const value = () => ({ surface: () => findSurface(local.surface) });

    return (
        <SurfaceContext.Provider value={value()}>
            {props.shallow ? props.children : <ClassNamesElement {...rest} />}
        </SurfaceContext.Provider>
    );
};

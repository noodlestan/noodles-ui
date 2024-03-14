import {
    ComponentContext,
    SurfaceContext,
    ThemeContext,
    TokenContext,
    VariantContext,
} from '@noodles-ui/support-types';
import {
    Accessor,
    Component,
    JSX,
    Setter,
    createContext,
    createSignal,
    useContext,
} from 'solid-js';

import { BuildData } from '../../types';

type BuildContextState = {
    error: Accessor<Error | undefined>;
    setError: Setter<Error | undefined>;
    isBuilding: Accessor<Date | undefined>;
    setIsBuilding: Setter<Date | undefined>;
    builds: Accessor<BuildData[]>;
    setBuilds: Setter<BuildData[]>;
    requestBuild: () => void;
    entities: {
        surfaces: () => SurfaceContext[];
        themes: () => ThemeContext[];
        variants: () => VariantContext[];
        components: () => ComponentContext[];
        tokens: () => TokenContext[];
    };
};

export const BuildContext = createContext<BuildContextState>({} as BuildContextState);

export const createBuildContext = (onRequestBuild: () => void): BuildContextState => {
    const [error, setError] = createSignal<Error>();
    const [isBuilding, setIsBuilding] = createSignal<Date>();
    const [builds, setBuilds] = createSignal<BuildData[]>([]);

    const lastBuild = () => {
        const items = builds();
        if (!items.length) {
            return;
        }
        return items[items.length - 1];
    };

    const surfaces = () => Object.values(lastBuild()?.snapshot.surfaces || {});
    const themes = () => Object.values(lastBuild()?.snapshot.themes || {});
    const variants = () => Object.values(lastBuild()?.snapshot.variants || {});
    const components = () => Object.values(lastBuild()?.snapshot.components || {});
    const tokens = () => Object.values(lastBuild()?.snapshot.tokens || {});

    return {
        error,
        setError,
        isBuilding,
        setIsBuilding,
        builds,
        setBuilds,
        requestBuild: () => {
            onRequestBuild();
            setIsBuilding(prev => prev || new Date());
        },
        entities: {
            surfaces,
            themes,
            variants,
            components,
            tokens,
        },
    };
};

type BuildContextProviderProps = {
    value: BuildContextState;
    children?: JSX.Element;
};

export const BuildContextProvider: Component<BuildContextProviderProps> = props => {
    const value = () => props.value;
    // eslint-disable-next-line solid/reactivity
    return <BuildContext.Provider value={value()}>{props.children}</BuildContext.Provider>;
};

export const useBuildContext = (): BuildContextState => {
    const context = useContext(BuildContext);
    if (!context || !context.builds) {
        throw new Error(`No BuildContext found`);
    }
    return context;
};

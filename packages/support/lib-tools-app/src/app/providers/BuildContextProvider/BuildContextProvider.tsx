import { Accessor, Component, JSX, createContext, useContext } from 'solid-js';

import { BuildEvent } from '~/app/types';

type BuildContextState = {
    error: Accessor<Error | undefined>;
    isBuilding: Accessor<Date | undefined>;
    builds: Accessor<BuildEvent[]>;
    requestBuild: () => void;
};

export const BuildContext = createContext<BuildContextState>({} as BuildContextState);

export const useBuildContext = (): BuildContextState => {
    const context = useContext(BuildContext);
    if (!context || !context.builds) {
        throw new Error(`No BuildContext found`);
    }
    return context;
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

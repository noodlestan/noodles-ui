import { BuildSnapshotDto } from '@noodles-ui/support-types';
import {
    Accessor,
    Component,
    JSX,
    Setter,
    createContext,
    createSignal,
    useContext,
} from 'solid-js';

type BuildContextState = {
    error: Accessor<Error | undefined>;
    setError: Setter<Error | undefined>;
    isBuilding: Accessor<Date | undefined>;
    setIsBuilding: Setter<Date | undefined>;
    snapshots: Accessor<BuildSnapshotDto[]>;
    lastSnapshot: () => BuildSnapshotDto | undefined;
    setSnapshots: Setter<BuildSnapshotDto[]>;
    requestBuild: () => void;
};

export const BuildContext = createContext<BuildContextState>({} as BuildContextState);

export const createBuildContext = (onRequestBuild: () => void): BuildContextState => {
    const [error, setError] = createSignal<Error>();
    const [isBuilding, setIsBuilding] = createSignal<Date>();
    const [snapshots, setSnapshots] = createSignal<BuildSnapshotDto[]>([]);

    const lastSnapshot = () => {
        const items = snapshots();
        if (!items.length) {
            return;
        }
        return items[items.length - 1];
    };

    return {
        error,
        setError,
        isBuilding,
        setIsBuilding,
        snapshots,
        lastSnapshot,
        setSnapshots,
        requestBuild: () => {
            onRequestBuild();
            setIsBuilding(prev => prev || new Date());
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
    if (!context || !context.snapshots) {
        throw new Error(`No BuildContext found`);
    }
    return context;
};

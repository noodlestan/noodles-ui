import { BuildSnapshot } from '@noodles-ui/core-compiler-types';
import {
    Accessor,
    Component,
    JSX,
    Setter,
    createContext,
    createSignal,
    useContext,
} from 'solid-js';

type SnapshotContextState = {
    error: Accessor<Error | undefined>;
    setError: Setter<Error | undefined>;
    isBuilding: Accessor<Date | undefined>;
    setIsBuilding: Setter<Date | undefined>;
    snapshots: Accessor<BuildSnapshot[]>;
    lastSnapshot: () => BuildSnapshot | undefined;
    setSnapshots: Setter<BuildSnapshot[]>;
    requestBuild: () => void;
};

export const SnapshotContext = createContext<SnapshotContextState>({} as SnapshotContextState);

export const createSnapshotContext = (onRequestBuild: () => void): SnapshotContextState => {
    const [error, setError] = createSignal<Error>();
    const [isBuilding, setIsBuilding] = createSignal<Date>();
    const [snapshots, setSnapshots] = createSignal<BuildSnapshot[]>([]);

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

type SnapshotContextProviderProps = {
    value: SnapshotContextState;
    children?: JSX.Element;
};

export const SnapshotContextProvider: Component<SnapshotContextProviderProps> = props => {
    const value = () => props.value;
    // eslint-disable-next-line solid/reactivity
    return <SnapshotContext.Provider value={value()}>{props.children}</SnapshotContext.Provider>;
};

export const useSnapshotContext = (): SnapshotContextState => {
    const context = useContext(SnapshotContext);
    if (!context || !context.snapshots) {
        throw new Error(`No BuildContext found`);
    }
    return context;
};

/// <reference types="vite/client" />

import { BuildSnapshot, BuildSnapshotDto, deserializeSnapshot } from '@noodles-ui/support-types';
import { Component, JSX, batch, createEffect } from 'solid-js';

import {
    SnapshotContextProvider,
    createSnapshotContext,
} from './providers/SnapshotContextProvider';

type EndpointResponse = BuildSnapshotDto;
type EndpointResponseTransformed = BuildSnapshot;

const SERVER_HOST = 'localhost';
const SERVER_PORT = import.meta.env.VITE_SERVER_PORT || 3000;
const SOCKET_ENDPOINT = `ws://${SERVER_HOST}:${SERVER_PORT}/api`;
const SERVER_ENDPOINT = `http://${SERVER_HOST}:${SERVER_PORT}/api`;

const fetchBuildStatus = async (): Promise<EndpointResponseTransformed> => {
    const response = await fetch(`${SERVER_ENDPOINT}/status`);
    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }
    const data = (await response.json()) as EndpointResponse;
    return deserializeSnapshot(data);
};

export const requestBuild = async (): Promise<void> => {
    const response = await fetch(`${SERVER_ENDPOINT}/build`);
    if (!response.ok) {
        throw new Error('Failed to request build');
    }
};

type DevServerProps = {
    children?: JSX.Element;
};

export const DevServer: Component<DevServerProps> = props => {
    const context = createSnapshotContext(requestBuild);

    const { setSnapshots: setBuilds, setError, setIsBuilding } = context;

    const ws = new WebSocket(SOCKET_ENDPOINT);
    const handleMessage = (message: MessageEvent) => {
        const data = JSON.parse(message.data);
        // console.log('WebSocket', data);
        if (data.name === 'build.started') {
            setIsBuilding(prev => prev || new Date());
        }
        if (data.name === 'build.finished') {
            const snapshot = deserializeSnapshot(data.value as BuildSnapshotDto);
            batch(() => {
                setIsBuilding(undefined);
                setBuilds(builds => [...builds, snapshot]);
            });
        }
    };

    createEffect(() => {
        ws.addEventListener('message', handleMessage);
        return () => {
            ws.removeEventListener('message', handleMessage);
        };
    });

    createEffect(() => {
        fetchBuildStatus()
            .then(status => {
                setBuilds(data => [...data, status]);
            })
            .catch(error => {
                setError(error);
            });
    });

    return <SnapshotContextProvider value={context}>{props.children}</SnapshotContextProvider>;
};

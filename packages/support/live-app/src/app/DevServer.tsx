/// <reference types="vite/client" />
import { BuildSnapshotDto } from '@noodles-ui/support-types';
import { Component, JSX, batch, createEffect } from 'solid-js';

import { BuildContextProvider, createBuildContext } from './providers/BuildContextProvider';

type EndpointResponse = BuildSnapshotDto;

const SERVER_HOST = 'localhost';
const SERVER_PORT = import.meta.env.VITE_SERVER_PORT || 3000;
const SOCKET_ENDPOINT = `ws://${SERVER_HOST}:${SERVER_PORT}/api`;
const SERVER_ENDPOINT = `http://${SERVER_HOST}:${SERVER_PORT}/api`;

const fetchBuildStatus = async (): Promise<EndpointResponse> => {
    const response = await fetch(`${SERVER_ENDPOINT}/status`);
    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }
    return response.json();
};

export const requestBuild = async (): Promise<EndpointResponse> => {
    const response = await fetch(`${SERVER_ENDPOINT}/build`);
    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }
    return response.json();
};

type DevServerProps = {
    children?: JSX.Element;
};

export const DevServer: Component<DevServerProps> = props => {
    const context = createBuildContext(requestBuild);

    const { setSnapshots: setBuilds, setError, setIsBuilding } = context;

    const ws = new WebSocket(SOCKET_ENDPOINT);
    const handleMessage = (message: MessageEvent) => {
        const data = JSON.parse(message.data);
        // console.log('WebSocket', data);
        if (data.name === 'build.started') {
            setIsBuilding(prev => prev || new Date());
        }
        if (data.name === 'build.finished') {
            const snapshot = data.value as BuildSnapshotDto;
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

    return <BuildContextProvider value={context}>{props.children}</BuildContextProvider>;
};

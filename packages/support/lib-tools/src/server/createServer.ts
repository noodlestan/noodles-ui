import { resolve } from 'path';

import fStatic from '@fastify/static';
import fastify, { FastifyInstance } from 'fastify';
import * as PubSub from 'pubsub-js';
import { WebSocket, WebSocketServer } from 'ws';

import { serializeSnapshot } from '../cli/io/private/serializeSnapshot';
import { logError } from '../cli/logger/logError';
import { logInfo } from '../cli/logger/logInfo';
import { logSuccess } from '../cli/logger/logSuccess';
import {
    EVENT_BUILD_FINISHED,
    EVENT_BUILD_STARTED,
    EVENT_REQUEST_BUILD,
} from '../events/constants';
import { BuildFinishedEvent } from '../events/types';

export type ServerOptions = {
    port: number;
};

export type DevServer = {
    app: FastifyInstance;
    nudge: () => void;
};

export const createServer = (option: ServerOptions): DevServer => {
    let lastBuild: BuildFinishedEvent;
    const port = option.port;
    // TODO locateLibToolsAppBuild() => locateNodeModule('@noodles-ui/live-app') + 'dist/'
    const root = resolve('../../support/live-app/dist/');
    const app = fastify();

    const wss = new WebSocketServer({ server: app.server });

    const sendMessage = (message: unknown) => {
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(message));
            }
        });
    };

    const logClients = () => {
        const clients = Array.from(wss.clients.values());
        logInfo(
            '[DevServer] clients:',
            clients.filter(client => client.readyState === WebSocket.OPEN).length +
                '/' +
                clients.length,
        );
    };

    wss.on('connection', function connection(ws) {
        logSuccess('[DevServer] Client connected');
        logClients();
        ws.on('error', error => logError('[DevServer]', error));
        // ws.on('message', function message(data) {
        //     console.log('received: %s', data);
        // });
        ws.on('disconnect', () => {
            logError('[DevServer] Client disconnected');
            logClients();
        });
    });

    PubSub.subscribe(EVENT_BUILD_STARTED, (eventName: string) => {
        sendMessage({ name: eventName });
    });

    PubSub.subscribe(EVENT_BUILD_FINISHED, (eventName: string, data: BuildFinishedEvent) => {
        lastBuild = data;
        const { success, timestamp, snapshot } = lastBuild;
        const value = {
            build: { success, timestamp },
            snapshot: serializeSnapshot(snapshot),
        };
        sendMessage({ name: eventName, value });
    });

    // app.get('/api/status', async (request, reply) => {
    app.get('/api/status', async () => {
        const { success, timestamp, snapshot } = lastBuild;
        return {
            build: { success, timestamp },
            snapshot: serializeSnapshot(snapshot),
        };
    });

    app.get('/api/build', async () => {
        PubSub.publish(EVENT_REQUEST_BUILD);
        return {};
    });

    // app.get('*', async (request, reply) => {
    //     return { lastBuild };
    // });

    app.register(fStatic, { root });

    const options = {
        port,
        host: 'localhost',
    };

    const logListener = () => {
        logInfo('[DevServer] Listening on:', `http://${options.host}:${options.port}`);
        logInfo('[DevServer] serving from:', root);
    };

    app.listen(options, err => {
        if (err) {
            logError('Failed to start server', err);
            process.exit(1);
        }
        logListener();
    });

    const nudge = () => {
        logListener();
        logClients();
    };

    return { app, nudge };
};

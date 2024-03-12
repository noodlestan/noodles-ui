import { resolve } from 'path';

import fStatic from '@fastify/static';
import fastify, { FastifyInstance } from 'fastify';
import * as PubSub from 'pubsub-js';
import { WebSocket, WebSocketServer } from 'ws';

import { logError } from '../cli/logger/logError';
import { logInfo } from '../cli/logger/logInfo';
import { logSuccess } from '../cli/logger/logSuccess';
import { EVENT_PREFIX_BUILD, EVENT_REQUEST_BUILD } from '../events/constants';
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
    // TODO locateLibToolsAppBuild() => locateNodeModule('@noodles-ui/lib-tools-app') + 'dist/'
    const root = resolve('../../support/lib-tools-app/dist/');
    const app = fastify();

    const wss = new WebSocketServer({ server: app.server });

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

    const handleOnBuildEvent = (eventName: string, data: BuildFinishedEvent) => {
        lastBuild = data;
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ name: eventName, value: lastBuild }));
            }
        });
    };
    PubSub.subscribe(EVENT_PREFIX_BUILD, handleOnBuildEvent);

    // app.get('/api/status', async (request, reply) => {
    app.get('/api/status', async () => {
        return { lastBuild };
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

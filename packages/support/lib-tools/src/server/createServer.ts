import { dirname, join } from 'path';

import fastify, { FastifyInstance } from 'fastify';
import { gray, green } from 'kleur';
import * as PubSub from 'pubsub-js';
import { sync as resolveSync } from 'resolve';
import { WebSocket, WebSocketServer } from 'ws';

import { logError } from '../cli/logger/logError';
import { logInfo } from '../cli/logger/logInfo';
import { logMessage } from '../cli/logger/logMessage';
import { logSuccess } from '../cli/logger/logSuccess';
import {
    EVENT_BUILD_FINISHED,
    EVENT_BUILD_STARTED,
    EVENT_REQUEST_BUILD,
} from '../events/constants';
import { BuildFinishedEvent } from '../events/types';

import { useSpaServer } from './private/useSpaServer';

export type ServerOptions = {
    port: number;
};

export type DevServer = {
    app: FastifyInstance;
    nudge: () => void;
};
export const createServer = (option: ServerOptions): DevServer => {
    let lastSnapshot: BuildFinishedEvent;
    const port = option.port;
    // TODO resolve() depends on package.json "main" field, we want a directory instead
    const root = join(dirname(dirname(resolveSync('@noodles-ui/live-app'))), 'dist');
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
        const readyCount = clients.filter(client => client.readyState === WebSocket.OPEN).length;
        const raw = readyCount + '/' + clients.length;
        const formattedClientCount = !readyCount ? gray(raw) : green(raw);
        logMessage('  Clients:', formattedClientCount);
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
            console.info('');
        });
    });

    PubSub.subscribe(EVENT_BUILD_STARTED, (eventName: string) => {
        sendMessage({ name: eventName });
    });

    PubSub.subscribe(EVENT_BUILD_FINISHED, (eventName: string, data: BuildFinishedEvent) => {
        lastSnapshot = data;
        sendMessage({ name: eventName, value: data });
    });

    app.get('/api/status', async () => {
        return lastSnapshot;
    });

    app.get('/api/build', async () => {
        PubSub.publish(EVENT_REQUEST_BUILD);
        return {};
    });

    app.get('*', useSpaServer(root));

    const options = {
        port,
        host: 'localhost',
    };

    const logListener = () => {
        logInfo('[DevServer]');
        logMessage('  Listening on:', `http://${options.host}:${options.port}`);
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
        console.info('');
    };

    return { app, nudge };
};

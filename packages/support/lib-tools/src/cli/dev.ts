import { join, resolve } from 'path';

import Queue from 'better-queue';
import { FSWatcher, watch as chok } from 'chokidar';
import * as PubSub from 'pubsub-js';

import {
    EVENT_BUILD_FINISHED,
    EVENT_BUILD_STARTED,
    EVENT_REQUEST_BUILD,
} from '../events/constants';
import { BuildStartedEvent } from '../events/types';
import { execBuild } from '../exec/execBuild';
import { createProject } from '../project/createProject';
import { getProjectFilenamesWatchlist } from '../project/getProjectFilenamesWatchlist';
import { ServerOptions, createServer } from '../server/createServer';

import { stripFilename } from './format/stripFilename';
import { loadProjectModulesCache } from './io/loadProjectModulesCache';
import { loadProjectSnapshotFile } from './io/private/loadProjectSnapshotFile';
import { logFileNamesList } from './log/logFileNamesList';
import { logFilenameMessage } from './log/logFilenameMessage';
import { logHeader } from './log/logHeader';
import { logProjectBasicInfo } from './log/logProjectBasicInfo';
import { logError } from './logger/logError';
import { logInfo } from './logger/logInfo';
import { logMessage } from './logger/logMessage';
import { logSuccess } from './logger/logSuccess';

// https://github.com/diamondio/better-queue/issues/55
type QueueSized = Queue & {
    length: number;
};

const getWatcherWatchedFiles = (watcher: FSWatcher): string[] => {
    const watchedFiles = watcher.getWatched();
    return Object.entries(watchedFiles).flatMap(([dir, files]) => {
        return files.map(filename => join(dir, filename));
    });
};

type DevOptions = {
    live: boolean;
    server: ServerOptions;
};

const defaultOptions: DevOptions = {
    live: true,
    server: {
        port: 3131,
    },
};

export const dev = async (fileName: string, options?: Partial<DevOptions>): Promise<void> => {
    logHeader('dev');

    const port = options?.server?.port || defaultOptions.server?.port;
    const server = createServer({ port });

    const projectFile = resolve(fileName);
    logInfo(`Watch project`, stripFilename(projectFile, resolve('.')));
    const project = await createProject(projectFile);

    const watcher = chok(projectFile, {
        ignored: /(^|[/\\])\../,
        persistent: true,
    });

    const refreshWatchers = async (): Promise<void> => {
        logInfo('reloading project...');
        logProjectBasicInfo(project);
        await loadProjectModulesCache(project);
        const sources = getProjectFilenamesWatchlist(project);
        const watched = getWatcherWatchedFiles(watcher);

        watched.forEach(filename => {
            if (!sources.includes(filename)) {
                logFilenameMessage(project, '- unwatch ', filename);
                watcher.unwatch(filename);
            } else {
                const index = sources.indexOf(filename);
                sources.splice(index, 1);
            }
        });

        logFileNamesList(project, '+ watch ', sources);
        watcher.add(sources);
        logSuccess('Project reloaded');
    };

    const buildNow = async (): Promise<void> => {
        const event: BuildStartedEvent = { timestamp: new Date() };
        PubSub.publish(EVENT_BUILD_STARTED, event);

        try {
            logInfo('building...');
            await execBuild();
            const snapshot = await loadProjectSnapshotFile(project);
            PubSub.publish(EVENT_BUILD_FINISHED, snapshot);
            logSuccess('Build successful');
        } catch (err) {
            const snapshot = await loadProjectSnapshotFile(project);
            PubSub.publish(EVENT_BUILD_FINISHED, snapshot);
            logError('Build error(s)', 'exit code: ' + err);
        }
    };

    const queue = new Queue(async (_: string, done) => {
        await buildNow();
        await refreshWatchers();
        done();
        server.nudge();
        setTimeout(() => {
            const fileCount = getWatcherWatchedFiles(watcher).length;
            const { length: queueLength } = queue as QueueSized;
            const { total: buildCount, average: avgBuildTime } = queue.getStats();
            logInfo('Stats');
            logMessage('- watched files:', fileCount);
            logMessage('- build count:', buildCount);
            logMessage('- build time (average):', Math.round(avgBuildTime) / 1000 + 's');
            logMessage('- queue size:', queueLength || '<empty>');
            console.info();
        }, 1);
    });

    const addTask = () => {
        const { length } = queue as QueueSized;
        if (length < 2) {
            queue.push('');
        }
    };

    watcher.on('change', addTask);
    PubSub.subscribe(EVENT_REQUEST_BUILD, addTask);
    addTask();
};

import { join, resolve } from 'path';

import Queue from 'better-queue';
import { FSWatcher, watch as chok } from 'chokidar';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { black, bold, green, red, white } from 'kleur';
import * as PubSub from 'pubsub-js';

import {
    EVENT_BUILD_FINISHED,
    EVENT_BUILD_STARTED,
    EVENT_REQUEST_BUILD,
} from '../events/constants';
import { BuildFinishedEvent, BuildStartedEvent } from '../events/types';
import { execBuild } from '../exec/execBuild';
import { createProject } from '../project/createProject';
import { getProjectFilenamesWatchlist } from '../project/private/getProjectFilenamesWatchlist';
import { ServerOptions, createServer } from '../server/createServer';
import { formatMilieconds } from '../util/string';

import { stripFilename } from './format/stripFilename';
import { loadProjectModulesCache } from './io/loadProjectModulesCache';
import { loadProjectSnapshotFile } from './io/private/loadProjectSnapshotFile';
import { hintExpandPattern } from './log/hintExpandPattern';
import { logFileNamesList } from './log/logFileNamesList';
import { logFilenameMessage } from './log/logFilenameMessage';
import { logHeader } from './log/logHeader';
import { logProjectBasicInfo } from './log/logProjectBasicInfo';
import { shouldExpand } from './log/shouldExpand';
import { logError } from './logger/logError';
import { logInfo } from './logger/logInfo';
import { logMessage } from './logger/logMessage';
import { logSuccess } from './logger/logSuccess';

// https://github.com/diamondio/better-queue/issues/55
type QueueSized = Queue & {
    length: number;
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

const getWatcherWatchedFiles = (watcher: FSWatcher): string[] => {
    const watchedFiles = watcher.getWatched();
    return Object.entries(watchedFiles).flatMap(([dir, files]) => {
        return files.map(filename => join(dir, filename));
    });
};

const formatBuildResult = (success: boolean | undefined): string | undefined => {
    if (success === undefined) {
        return;
    }
    return bold(success ? green('\u2588\u2588 Success') : red('\u2588\u2588 Failed'));
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

    let lastSnapshot: BuildFinishedEvent | undefined;

    const refreshWatchers = async (): Promise<void> => {
        logInfo('...reloading project...', undefined, hintExpandPattern(project, 'watcher'));
        logProjectBasicInfo(project);
        await loadProjectModulesCache(project);
        const sources = getProjectFilenamesWatchlist(project);
        const watched = getWatcherWatchedFiles(watcher);

        watched.forEach(filename => {
            if (!sources.includes(filename)) {
                watcher.unwatch(filename);
                if (shouldExpand(project, 'watcher')) {
                    logFilenameMessage(project, '- unwatch ', filename);
                }
            } else {
                const index = sources.indexOf(filename);
                sources.splice(index, 1);
            }
        });

        watcher.add(sources);
        if (shouldExpand(project, 'watcher')) {
            logFileNamesList(project, '+ watch ', sources);
        }
    };

    const buildNow = async (): Promise<boolean> => {
        const event: BuildStartedEvent = { timestamp: new Date() };
        PubSub.publish(EVENT_BUILD_STARTED, event);

        try {
            await execBuild();
            const snapshot = await loadProjectSnapshotFile(project);
            lastSnapshot = snapshot;
            PubSub.publish(EVENT_BUILD_FINISHED, snapshot);
            logSuccess('Build successful');
            return true;
        } catch (err) {
            const snapshot = await loadProjectSnapshotFile(project);
            lastSnapshot = snapshot;
            PubSub.publish(EVENT_BUILD_FINISHED, snapshot);
            logError('Build error(s)', 'exit code: ' + err);
            return false;
        }
    };

    const queue = new Queue(async (_: string, done) => {
        const lastBuild = formatBuildResult(lastSnapshot?.success);
        const re = lastBuild ? 're' : '';
        logInfo(`...${re}building...`, lastBuild ? 'last build: ' + lastBuild : '');
        const success = await buildNow();
        await refreshWatchers();
        done();
        logHeader('dev', success);
        server.nudge();
        setTimeout(() => {
            const fileCount = getWatcherWatchedFiles(watcher).length;
            const { length: queueLength } = queue as QueueSized;
            const { total: buildCount, average: avgBuildTime } = queue.getStats();
            logInfo('Build');
            logMessage('  Last build:', formatBuildResult(success));

            logMessage('  Watched files:', fileCount);
            logMessage('  Build count:', buildCount);
            logMessage('  Build time (average):', formatMilieconds(avgBuildTime));
            logMessage('  Queue size:', queueLength || '<empty>');
            console.info();
            logInfo('...watching for file changes...');
            console.info();
        }, 1);
    });

    const addTask = () => {
        const { length } = queue as QueueSized;
        if (length < 2) {
            queue.push('');
        }
    };

    const onChangesDetected = () => {
        logInfo('...changes detected, build queued...');
        addTask();
    };

    const onBuildRequested = () => {
        logInfo('...build requested, queued...');
        addTask();
    };

    watcher.on('change', onChangesDetected);
    PubSub.subscribe(EVENT_REQUEST_BUILD, onBuildRequested);
    addTask();
};

import { join, resolve } from 'path';

import Queue from 'better-queue';
import { FSWatcher, watch as chok } from 'chokidar';
import figlet from 'figlet';

import { QueueSized } from '../api';
import { logError } from '../cli/logError';
import { logFilelist } from '../cli/logFilelist';
import { logInfo } from '../cli/logInfo';
import { logMessage } from '../cli/logMessage';
import { logProjectBasicInfo } from '../cli/logProjectBasicInfo';
import { logSuccess } from '../cli/logSuccess';
import { stripFilename } from '../cli/stripFilename';
import { execBuild } from '../exec/execBuild';
import { createProject } from '../project/createProject';
import { getProjectFilenamesWatchlist } from '../project/getProjectFilenamesWatchlist';
import { NUI_BUILD_FILE } from '../resources/constants';

const getWatcherWatchedFiles = (watcher: FSWatcher): string[] => {
    const watchedFiles = watcher.getWatched();
    return Object.entries(watchedFiles).flatMap(([dir, files]) => {
        return files.map(filename => join(dir, filename));
    });
};

export const watch = async (): Promise<void> => {
    console.info(figlet.textSync('Noodles UI'));
    const projectFile = resolve(join('.', NUI_BUILD_FILE));
    logInfo(`Watch project`, stripFilename(projectFile, resolve('.')));

    const project = await createProject(projectFile);
    logProjectBasicInfo(project);

    const watcher = chok(projectFile, {
        ignored: /(^|[/\\])\../,
        persistent: true,
    });

    const refreshWatchers = async (): Promise<void> => {
        logInfo('reloading project...');
        const sources = getProjectFilenamesWatchlist(project);
        const watched = getWatcherWatchedFiles(watcher);
        watched.forEach(filename => {
            if (!sources.includes(filename)) {
                console.info('- unwatch ', filename);
                watcher.unwatch(filename);
            } else {
                const index = sources.indexOf(filename);
                sources.splice(index, 1);
            }
        });

        logFilelist('+ watch ', sources);
        watcher.add(sources);
    };

    const buildNow = async (): Promise<void> => {
        try {
            logInfo('building...');
            await execBuild();
            logSuccess('Build successful');
        } catch (err) {
            logError('Build error(s)', err as Error);
        }
    };

    const queue = new Queue(async (_: string, done) => {
        await buildNow();
        done();
        await refreshWatchers();
        setTimeout(() => {
            logSuccess('Project reloaded');
            const fileCount = getWatcherWatchedFiles(watcher).length;
            const { length: queueLength } = queue as QueueSized;
            const { total: buildCount, average: avgBuildTime } = queue.getStats();
            const data = { fileCount, queueLength, buildCount, avgBuildTime };
            logMessage('stats', data);
        }, 1);
    });

    const addTask = () => queue.push('');

    watcher.on('change', () => {
        const { length } = queue as QueueSized;
        if (length < 2) {
            addTask();
        }
    });

    addTask();
};

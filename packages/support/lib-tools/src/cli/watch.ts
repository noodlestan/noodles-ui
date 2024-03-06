import { join, resolve } from 'path';

import Queue from 'better-queue';
import { FSWatcher, watch as chok } from 'chokidar';
import figlet from 'figlet';

import { execBuild } from '../exec/execBuild';
import { createProject } from '../project/createProject';
import { getProjectFilenamesWatchlist } from '../project/getProjectFilenamesWatchlist';
import { ProjectContext } from '../types/projects';

import { stripFilename } from './format/stripFilename';
import { loadProjectModulesCache } from './io/loadProjectModulesCache';
import { logFilelist } from './log/logFilelist';
import { logFilenameMessage } from './log/logFilenameMessage';
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

export const watch = async (fileName: string): Promise<void> => {
    console.info(figlet.textSync('Noodles UI'));

    const projectFile = resolve(fileName);
    logInfo(`Watch project`, stripFilename(projectFile, resolve('.')));

    const watcher = chok(projectFile, {
        ignored: /(^|[/\\])\../,
        persistent: true,
    });

    const refreshWatchers = async (project: ProjectContext): Promise<void> => {
        logInfo('reloading project...');
        await loadProjectModulesCache(project);
        const sources = getProjectFilenamesWatchlist(project);
        const watched = getWatcherWatchedFiles(watcher);

        watched.forEach(filename => {
            if (!sources.includes(filename)) {
                logFilenameMessage(project.build.modules, '- unwatch ', filename);
                watcher.unwatch(filename);
            } else {
                const index = sources.indexOf(filename);
                sources.splice(index, 1);
            }
        });

        logFilelist(project.build.modules, '+ watch ', sources);
        watcher.add(sources);
        logSuccess('Project reloaded');
    };

    const buildNow = async (): Promise<ProjectContext> => {
        const project = await createProject(projectFile);
        try {
            logProjectBasicInfo(project);

            logInfo('building...');
            await execBuild();
            logSuccess('Build successful');
        } catch (err) {
            logError('Build error(s)', err as Error);
        }
        return project;
    };

    const queue = new Queue(async (_: string, done) => {
        const project = await buildNow();
        await refreshWatchers(project);
        done();
        setTimeout(() => {
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

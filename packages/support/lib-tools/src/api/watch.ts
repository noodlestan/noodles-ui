import { join, resolve } from 'path';

import Queue from 'better-queue';
import { FSWatcher, watch as chok } from 'chokidar';
import figlet from 'figlet';

import { QueueSized } from '../api';
import { loadProjectModules } from '../cli/loadProjectModules';
import { logError } from '../cli/logError';
import { logFilelist } from '../cli/logFilelist';
import { logFilenameMessage } from '../cli/logFilenameMessage';
import { logInfo } from '../cli/logInfo';
import { logMessage } from '../cli/logMessage';
import { logProjectBasicInfo } from '../cli/logProjectBasicInfo';
import { logSuccess } from '../cli/logSuccess';
import { stripFilename } from '../cli/stripFilename';
import { execBuild } from '../exec/execBuild';
import { createProject } from '../project/createProject';
import { getProjectFilenamesWatchlist } from '../project/getProjectFilenamesWatchlist';
import { ProjectContext } from '../types/projects';

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
        await loadProjectModules(project);
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

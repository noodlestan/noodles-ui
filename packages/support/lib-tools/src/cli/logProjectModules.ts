import { green, yellow } from 'kleur';

import { getProjectFilenamesWatchlist } from '../project/getProjectFilenamesWatchlist';
import { ProjectContext } from '../types/projects';

import { formatFileName } from './formatFileName';
import { logInfo } from './logInfo';
import { logMessage } from './logMessage';

export const logProjectModules = (project: ProjectContext): void => {
    const sources = getProjectFilenamesWatchlist(project);
    const modules = project.build.modules;

    logInfo('project sources');

    Array.from(modules.keys()).forEach(mod => {
        const module = modules.get(mod);
        if (module && module.filenames.length) {
            const { name, path, filenames } = module;
            const lines = [
                green(name),
                '   path: ' + formatFileName(project.build.modules, path, true),
                '   files: ' + yellow(filenames.length),
            ];
            logMessage('+ module:', lines.join('\n'));
        }
    });

    logMessage('\nfiles:', sources.length);
    console.info('');
};

import { green, yellow } from 'kleur';

import { getProjectFilenamesWatchlist } from '../../project/getProjectFilenamesWatchlist';
import { ProjectContext } from '../../types/projects';
import { formatFileName } from '../format/formatFileName';

import { logInfo } from './logInfo';
import { logMessage } from './logMessage';

export const logProjectModules = (project: ProjectContext): void => {
    const sources = getProjectFilenamesWatchlist(project);
    const modules = project.build.modules;

    const relevantModules = Array.from(modules.values()).filter(m => m.filenames.length > 0);

    logInfo('Project modules');
    logMessage('files:', sources.length);
    logMessage('modules:', relevantModules.length);
    console.info('');

    relevantModules.forEach(module => {
        if (module) {
            const { name, path, filenames } = module;
            logMessage(green(name));
            logMessage('   path: ' + formatFileName(project.build.modules, path, true));
            logMessage('   files: ' + yellow(filenames.length));
        }
    });

    console.info('');
};

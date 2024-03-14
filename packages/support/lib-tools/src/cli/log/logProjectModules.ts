import { ProjectContext } from '@noodles-ui/support-types';
import { green, yellow } from 'kleur';

import { getProjectFilenamesWatchlist } from '../../project/getProjectFilenamesWatchlist';
import { formatFileName } from '../format/formatFileName';
import { logInfo } from '../logger/logInfo';
import { logMessage } from '../logger/logMessage';

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
            logMessage(' path: ' + formatFileName(project, path, true));
            logMessage(' files: ' + yellow(filenames.length));
        }
    });

    console.info('');
};

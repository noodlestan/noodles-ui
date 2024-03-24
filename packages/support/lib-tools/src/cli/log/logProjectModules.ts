import { ProjectContext } from '@noodles-ui/support-types';
import { green, yellow } from 'kleur';

import { getProjectFilenamesWatchlist } from '../../project/private/getProjectFilenamesWatchlist';
import { plural } from '../../util/string';
import { formatFileName } from '../format/formatFileName';
import { logInfo } from '../logger/logInfo';
import { logMessage } from '../logger/logMessage';

import { hintExpandPattern } from './hintExpandPattern';
import { shouldExpand } from './shouldExpand';

export const logProjectModules = (project: ProjectContext): void => {
    const sources = getProjectFilenamesWatchlist(project);
    const modules = project.build.modules;

    const relevantModules = Array.from(modules.values()).filter(m => m.filenames.length > 0);

    const countF = sources.length;
    const countM = relevantModules.length;
    const counts =
        yellow(countF) +
        plural(countF, ' file') +
        ' / ' +
        yellow(countM) +
        plural(countM, ' module');
    if (!shouldExpand(project, 'modules')) {
        const hint = hintExpandPattern(project, 'modules');
        logInfo('Project modules', counts, hint);
    }
    if (shouldExpand(project, 'modules')) {
        logInfo('Project modules');
        logMessage('  Files:', sources.length);
        logMessage('  Modules:', relevantModules.length);
        console.info('');

        relevantModules.forEach(module => {
            if (module) {
                const { name, path, filenames } = module;
                logMessage(green(name));
                logMessage('  path: ' + formatFileName(project, path, true));
                logMessage('  files: ' + yellow(filenames.length));
            }
        });

        if (relevantModules.length) {
            console.info('');
        }
    }
};

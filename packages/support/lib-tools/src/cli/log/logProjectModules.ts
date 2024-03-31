import { CompilerContext, getProjectFilenamesWatchlist } from '@noodles-ui/core-compiler';
import { green, yellow } from 'kleur';

import { plural } from '../../util/string';
import { formatFileNameRelativeToProject } from '../format/formatFileNameRelativeToProject';
import { logInfo } from '../logger/logInfo';
import { logMessage } from '../logger/logMessage';

import { hintExpandPattern } from './hintExpandPattern';
import { shouldExpand } from './shouldExpand';

export const logProjectModules = (compiler: CompilerContext): void => {
    const sources = getProjectFilenamesWatchlist(compiler);
    const modules = compiler.build.modules;

    const relevantModules = Array.from(modules.values()).filter(m => m.filenames.length > 0);

    const countF = sources.length;
    const countM = relevantModules.length;
    const counts =
        yellow(countF) +
        plural(countF, ' file') +
        ' / ' +
        yellow(countM) +
        plural(countM, ' module');
    if (!shouldExpand(compiler, 'modules')) {
        const hint = hintExpandPattern(compiler, 'modules');
        logInfo('Project modules', counts, hint);
    }
    if (shouldExpand(compiler, 'modules')) {
        logInfo('Project modules');
        logMessage('  Files:', sources.length);
        logMessage('  Modules:', relevantModules.length);
        console.info('');

        relevantModules.forEach(module => {
            if (module) {
                const { name, path, filenames } = module;
                logMessage(green(name));
                logMessage('  path: ' + formatFileNameRelativeToProject(compiler, path, true));
                logMessage('  files: ' + yellow(filenames.length));
            }
        });

        if (relevantModules.length) {
            console.info('');
        }
    }
};

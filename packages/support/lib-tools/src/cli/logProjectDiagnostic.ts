import { bold, gray, red, yellow } from 'kleur';

import { getResourceName } from '../project/resources/getResourceName';
import { getResourceType } from '../project/resources/getResourceType';
import { ProjectDiagnostic, ProjectDiagnosticSource } from '../types/projects';

import { logError } from './logError';
import { logMessage } from './logMessage';

const logDiagnosticSource = (source: ProjectDiagnosticSource): void => {
    if (typeof source === 'string') {
        console.info('  in ' + source);
        return;
    }
    const type = getResourceType(source);
    const name = getResourceName(source);
    const { module } = source;
    logMessage('  in ' + bold(type) + ' ' + gray(module || '??') + ' / ' + name || '');
    if (Object.values(source).length) {
        console.info('');
        console.info(yellow('  resource:'));
        console.info('');
        Object.keys(source).forEach(key =>
            console.info(`${key}:`, source[key as keyof ProjectDiagnosticSource]),
        );
        console.info('');
    }
};
export const logProjectDiagnostic = (diagnostic: ProjectDiagnostic): void => {
    const { source, message } = diagnostic;
    logError(`error`, red(message));
    logDiagnosticSource(source);
};

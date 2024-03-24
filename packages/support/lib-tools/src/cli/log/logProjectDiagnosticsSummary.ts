import { ProjectContext } from '@noodles-ui/support-types';
import { red } from 'kleur';

import { plural } from '../../util/string';
import { logError } from '../logger/logError';
import { logMessage } from '../logger/logMessage';

import { getDiagnosticKey } from './getDiagnosticKey';

export const logProjectDiagnosticsSummary = (project: ProjectContext): void => {
    const { diagnostics } = project;
    const sources = diagnostics.reduce(
        (acc, diagnostic) => {
            const sourceKey = getDiagnosticKey(project, diagnostic.source);
            acc[sourceKey] = acc[sourceKey] || 0;
            acc[sourceKey]++;
            return acc;
        },
        {} as { [key: string]: number },
    );

    if (diagnostics.length) {
        const issues = diagnostics.length;
        logError('Project errors:', red(`${issues} ${plural(issues, 'error')}`));
        Object.entries(sources).forEach(([sourceKey, i]) => {
            logMessage('  ' + sourceKey, red(`(${i} ${plural(i, 'error')})`));
        });
        console.info(' ');
    }
};

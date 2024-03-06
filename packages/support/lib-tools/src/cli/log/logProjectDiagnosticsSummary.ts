import { red } from 'kleur';

import { ProjectContext } from '../../types/projects';
import { logError } from '../logger/logError';
import { logMessage } from '../logger/logMessage';

import { getdiagnosticSourceKey } from './getdiagnosticSourceKey';

export const logProjectDiagnosticsSummary = (project: ProjectContext): void => {
    const { diagnostics } = project;
    const sources = diagnostics.reduce(
        (acc, diagnostic) => {
            const sourceKey = getdiagnosticSourceKey(project, diagnostic.source);
            acc[sourceKey] = acc[sourceKey] || 0;
            acc[sourceKey]++;
            return acc;
        },
        {} as { [key: string]: number },
    );

    const plural = (num: number, text: string) => (num === 1 ? text : text + 's');

    if (diagnostics.length) {
        const issues = diagnostics.length;
        logError('Project errors:', red(`${issues} ${plural(issues, 'error')}`));
        Object.entries(sources).forEach(([sourceKey, i]) => {
            logMessage('  ' + sourceKey, red(`(${i} ${plural(i, 'error')})`));
        });
        console.info(' ');
    }
};

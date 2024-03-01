import { red } from 'kleur';

import { getResourceTypedKey } from '../../project/resources/getResourceTypedKey';
import { ProjectContext, ProjectDiagnosticSource } from '../../types/projects';

import { logError } from './logError';
import { logMessage } from './logMessage';

const getSourceKey = (source: ProjectDiagnosticSource): string => {
    if (typeof source === 'string') {
        return source;
    }
    return getResourceTypedKey(source);
};

export const logProjectDiagnosticsSummary = (project: ProjectContext): void => {
    const { diagnostics } = project;
    const sources = diagnostics.reduce(
        (acc, diagnostic) => {
            const sourceKey = getSourceKey(diagnostic.source);
            acc[sourceKey] = acc[sourceKey] || 0;
            acc[sourceKey]++;
            return acc;
        },
        {} as { [key: string]: number },
    );

    const plural = (num: number, text: string) => (num === 1 ? text : text + 's');

    if (diagnostics.length) {
        const issues = diagnostics.length;
        logError('Project:', red(`${issues} ${plural(issues, 'issue')}`));
        Object.entries(sources).forEach(([sourceKey, i]) => {
            logMessage('  ' + sourceKey, red(`(${i} ${plural(i, 'issue')})`));
        });
        console.info(' ');
    }
};

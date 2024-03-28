import {
    ProjectContext,
    getAllDiagnosticSourceKeys,
    getDiagnosticErrors,
    getDiagnosticWarnings,
    getItemsWithErrors,
    getItemsWithWarnings,
} from '@noodles-ui/support-types';

import { logError } from '../logger/logError';
import { logMessage } from '../logger/logMessage';
import { logWarning } from '../logger/logWarning';

import { formatWarningsAndErrors } from './formatWarningsAndErrors';

export const logProjectDiagnosticsSummary = (project: ProjectContext): void => {
    const { diagnostics } = project;

    const sourcesWithIssues = getAllDiagnosticSourceKeys(project.diagnostics);
    const itemsWithWarnings = getItemsWithWarnings(project.diagnostics);
    const itemsWithErrors = getItemsWithErrors(project.diagnostics);
    const errorCount = getDiagnosticErrors(project.diagnostics).length;
    const warnCount = getDiagnosticWarnings(project.diagnostics).length;

    if (diagnostics.length) {
        const logFn = errorCount ? logError : logWarning;
        logFn('Project issues', formatWarningsAndErrors(warnCount, errorCount));

        sourcesWithIssues.forEach(sourceKey => {
            const warnCount = itemsWithWarnings[sourceKey] || 0;
            const errorCount = itemsWithErrors[sourceKey] || 0;
            const counts = formatWarningsAndErrors(warnCount, errorCount);
            logMessage('  ' + sourceKey, counts);
        });
        console.info(' ');
    }
};

import { ProjectContext } from '@noodles-ui/support-types';

import { getAllDiagnosticSourceKeys } from '../../project/getters/getAllDiagnosticSourceKeys';
import { getItemsWithErrors } from '../../project/getters/getItemsWithErrors';
import { getItemsWithWarnings } from '../../project/getters/getItemsWithWarnings';
import { getProjectErrors } from '../../project/getters/getProjectErrors';
import { getProjectWarnings } from '../../project/getters/getProjectWarnings';
import { logError } from '../logger/logError';
import { logMessage } from '../logger/logMessage';
import { logWarning } from '../logger/logWarning';

import { formatWarningsAndErrors } from './formatWarningsAndErrors';

export const logProjectDiagnosticsSummary = (project: ProjectContext): void => {
    const { diagnostics } = project;

    const sourcesWithIssues = getAllDiagnosticSourceKeys(project);
    const itemsWithWarnings = getItemsWithWarnings(project);
    const itemsWithErrors = getItemsWithErrors(project);
    const errorCount = getProjectErrors(project).length;
    const warnCount = getProjectWarnings(project).length;

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

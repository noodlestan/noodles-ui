import { CompilerContext } from '@noodles-ui/core-compiler';
import {
    getAllDiagnosticSourceKeys,
    getDiagnosticErrors,
    getDiagnosticWarnings,
    getItemsWithErrors,
    getItemsWithWarnings,
} from '@noodles-ui/core-diagnostics';

import { logError } from '../logger/logError';
import { logMessage } from '../logger/logMessage';
import { logWarning } from '../logger/logWarning';

import { formatWarningsAndErrors } from './formatWarningsAndErrors';

export const logProjectDiagnosticsSummary = (compiler: CompilerContext): void => {
    const { diagnostics } = compiler;

    const sourcesWithIssues = getAllDiagnosticSourceKeys(compiler.diagnostics);
    const itemsWithWarnings = getItemsWithWarnings(compiler.diagnostics);
    const itemsWithErrors = getItemsWithErrors(compiler.diagnostics);
    const errorCount = getDiagnosticErrors(compiler.diagnostics).length;
    const warnCount = getDiagnosticWarnings(compiler.diagnostics).length;

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

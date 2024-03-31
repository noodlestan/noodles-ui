import {
    CompilerContext,
    ProjectDiagnostic,
    ProjectDiagnosticFileError,
    ProjectDiagnosticSource,
    UnknownResource,
    fileErrorFromDiagnosticSource,
} from '@noodles-ui/support-types';
import { bold, gray, red, white, yellow } from 'kleur';

import { getResourceName } from '../../compiler/resources/getters/getResourceName';
import { getResourceType } from '../../compiler/resources/getters/getResourceType';
import { formatFileNameRelativeToProject } from '../format/formatFileNameRelativeToProject';
import { logError } from '../logger/logError';
import { logMessage } from '../logger/logMessage';
import { logWarning } from '../logger/logWarning';

import { hintExpandPattern } from './hintExpandPattern';
import { resourceFromDiagnosticSource } from './resourceFromDiagnosticSource';
import { shouldExpand } from './shouldExpand';

const logDiagnosticFileError = (
    compiler: CompilerContext,
    fileError: ProjectDiagnosticFileError,
) => {
    const fileName = formatFileNameRelativeToProject(compiler, fileError.fileName, true);
    const { line: lineNumber, column: columnNumber, sourceCode } = fileError;
    logMessage('  in ' + fileName);
    logMessage('  at line ' + lineNumber + ', column ' + columnNumber + '\n');
    if (sourceCode) {
        const locator = gray('-'.repeat(columnNumber - 1)) + red('^');
        const lines = sourceCode.split('\n');
        const beforeLines = lines.slice(lineNumber - 4, lineNumber - 1);
        const errorLine = lines[lineNumber - 1];
        const afterLines = lines.slice(lineNumber, lineNumber + 1);
        const snippet = [
            ...beforeLines.map(gray),
            white(errorLine),
            locator,
            ...afterLines.map(gray),
        ];
        snippet.forEach(line => logMessage('    ' + line));
        console.info('');
    }
};

const logDiagnosticResource = (resource: UnknownResource, source: ProjectDiagnosticSource) => {
    const type = getResourceType(resource);
    const name = getResourceName(resource);
    const { module } = resource;
    logMessage('  in ' + bold(type) + ' ' + gray(module || '??') + ' / ' + name || '');
    if (Object.values(source).length) {
        console.info('');
        console.info(white(bold('  resource:')));
        console.info('');
        Object.keys(source).forEach(key =>
            console.info(`${key}:`, source[key as keyof ProjectDiagnosticSource]),
        );
        console.info('');
    }
};

const logDiagnosticSource = (compiler: CompilerContext, source: ProjectDiagnosticSource): void => {
    const fileError = fileErrorFromDiagnosticSource(source);
    if (fileError) {
        logDiagnosticFileError(compiler, fileError);
        return;
    }
    const resource = resourceFromDiagnosticSource(source);
    if (resource) {
        logDiagnosticResource(resource, source);
        return;
    }
    if (typeof source === 'string') {
        console.info('  zin ' + source);
        return;
    }
    console.info(source);
};

export const logProjectDiagnostic = (
    compiler: CompilerContext,
    diagnostic: ProjectDiagnostic,
): void => {
    const { source, message, severity } = diagnostic;
    if (severity === 'error') {
        logError('Project error', red(message));
    } else {
        const hint = hintExpandPattern(compiler, 'warnings');
        logWarning('Project warning', yellow(message), hint);
    }
    if (severity === 'error' || shouldExpand(compiler, 'warnings')) {
        logDiagnosticSource(compiler, source);
        if (diagnostic.data) {
            const data = diagnostic.data as { [key: string]: unknown };
            for (const key in data) {
                // NOTE: key can be something like "eslintOptions"
                if (shouldExpand(compiler, key)) {
                    logMessage('details:' + key, data[key] || '');
                }
            }
        }
    }
};

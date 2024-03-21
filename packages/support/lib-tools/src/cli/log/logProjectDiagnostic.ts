import {
    ProjectContext,
    ProjectDiagnostic,
    ProjectDiagnosticFileError,
    ProjectDiagnosticSource,
    UnknownResource,
} from '@noodles-ui/support-types';
import { bold, gray, green, red, yellow } from 'kleur';

import { getResourceName } from '../../project/resources/getters/getResourceName';
import { getResourceType } from '../../project/resources/getters/getResourceType';
import { formatFileNameRelativeToProject } from '../format/formatFileNameRelativeToProject';
import { logError } from '../logger/logError';
import { logMessage } from '../logger/logMessage';

import { fileErrorFromDiagnosticSource } from './fileErrorFromDiagnosticSource';
import { resourceFromDiagnosticSource } from './resourceFromDiagnosticSource';
import { shouldExpand } from './shouldExpand';

const logDiagnosticFileError = (project: ProjectContext, fileError: ProjectDiagnosticFileError) => {
    const fileName = formatFileNameRelativeToProject(project, fileError.fileName);
    const { line, column, sourceCode } = fileError;
    logMessage('  in ' + green(fileName));
    logMessage('  at line ' + line + ', column ' + column + '\n');
    if (sourceCode) {
        const locator = gray('-'.repeat(column - 1)) + red('^');
        const lines = sourceCode.split('\n');
        const beforeLines = lines.slice(line - 4, line - 1);
        const errorLine = lines[line - 1];
        const afterLines = lines.slice(line, line + 1);
        const snippet = [
            ...beforeLines.map(gray),
            bold(errorLine),
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
        console.info(yellow('  resource:'));
        console.info('');
        Object.keys(source).forEach(key =>
            console.info(`${key}:`, source[key as keyof ProjectDiagnosticSource]),
        );
        console.info('');
    }
};

const logDiagnosticSource = (project: ProjectContext, source: ProjectDiagnosticSource): void => {
    const fileError = fileErrorFromDiagnosticSource(source);
    if (fileError) {
        logDiagnosticFileError(project, fileError);
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
    project: ProjectContext,
    diagnostic: ProjectDiagnostic,
): void => {
    const { source, message } = diagnostic;
    logError('Project error', red(message));
    logDiagnosticSource(project, source);
    if (diagnostic.data) {
        const data = diagnostic.data as { [key: string]: unknown };
        for (const key in data) {
            // NOTE: key can be something like "eslintOptions"
            if (shouldExpand(project, key)) {
                logMessage('details:' + key, data[key] || '');
            }
        }
    }
};

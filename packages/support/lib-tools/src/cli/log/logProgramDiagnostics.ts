import { ProjectContext } from '@noodles-ui/support-types';
import { gray, red, white } from 'kleur';
import ts from 'typescript';

import { formatFileNameRelativeToProject } from '../format/formatFileNameRelativeToProject';
import { logError } from '../logger/logError';
import { logMessage } from '../logger/logMessage';

const logDiagnosticEntry = (project: ProjectContext, diagnostic: ts.Diagnostic) => {
    const { code, messageText } = diagnostic;
    const message = typeof messageText === 'object' ? messageText.messageText : messageText;
    logError('Compile error', gray(`TS${code}: `) + red(message));

    const fileName = diagnostic.file?.fileName
        ? formatFileNameRelativeToProject(project, diagnostic.file?.fileName, true)
        : '??';
    logMessage('  in ' + fileName);
    const start = diagnostic.start || 0;
    const text = diagnostic.file?.text || '';
    const beforeText = text.substring(0, start);
    const afterText = text.substring(start, text.length);
    const lineNumber = (beforeText?.match(/\n/g)?.length || 0) + 1;
    const beforeLines = beforeText.split('\n').splice(-3);
    const afterLines = afterText.split('\n').splice(0, 2);
    const before = beforeLines.pop() || '';
    const after = afterLines.shift() || '';
    const columnNumber = before.length;
    const locator = gray('-'.repeat(before.length)) + red('^');
    const snippet = [
        ...beforeLines.map(gray),
        white(before + after),
        locator,
        ...afterLines.map(gray),
    ];
    if (diagnostic.start) {
        logMessage('  at line ' + lineNumber + ', column ' + columnNumber + '\n');
        snippet.forEach(line => logMessage('    ' + line));
    }
};

export function logProgramDiagnostics(project: ProjectContext): void {
    const diagnostics = project.build.diagnostics || [];
    diagnostics.forEach(diagnostic => {
        logDiagnosticEntry(project, diagnostic);
    });
    if (diagnostics.length) {
        console.info('');
    }
}

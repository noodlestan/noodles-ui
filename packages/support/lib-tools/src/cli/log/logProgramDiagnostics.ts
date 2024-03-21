import { bold, gray, green, red } from 'kleur';
import ts from 'typescript';

import { logError } from '../logger/logError';
import { logMessage } from '../logger/logMessage';

// import codes from './diagnostics/codes.json';
// console.log(codes);

const logDiagnosticEntry = (diagnostic: ts.Diagnostic) => {
    // const message = Object.entries(codes).find(
    //     ([message, value]) => value.code === diagnostic.code,
    // );
    const { code, messageText } = diagnostic;
    const message = typeof messageText === 'object' ? messageText.messageText : messageText;
    logError('Compile error', gray(`TS${code}: `) + red(message));
    logMessage('  in ' + green(diagnostic.file?.fileName || '??'));
    const start = diagnostic.start || 0;
    const text = diagnostic.file?.text || '';
    const beforeText = text.substring(0, start);
    const afterText = text.substring(start, text.length);
    const lineNumber = (beforeText?.match(/\n/g)?.length || 0) + 1;
    const beforeLines = beforeText.split('\n').splice(-3);
    const afterLines = afterText.split('\n').splice(0, 2);
    const before = beforeLines.pop() || '';
    const after = afterLines.shift() || '';
    const column = before.length;
    const locator = gray('-'.repeat(before.length)) + red('^');
    const snippet = [
        ...beforeLines.map(gray),
        bold(before + after),
        locator,
        ...afterLines.map(gray),
    ];
    if (diagnostic.start) {
        logMessage('  at line ' + lineNumber + ', column ' + column + '\n');
        snippet.forEach(line => logMessage('    ' + line));
    }
};

export function logProgramDiagnostics(diagnostics: ts.Diagnostic[]): void {
    diagnostics.forEach(diagnostic => {
        logDiagnosticEntry(diagnostic);
    });
    if (diagnostics.length) {
        console.info('');
    }
}

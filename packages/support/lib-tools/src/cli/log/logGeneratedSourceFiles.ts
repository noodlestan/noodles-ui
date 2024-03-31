import { CompilerContext } from '@noodles-ui/core-compiler';
import { gray, green, red, yellow } from 'kleur';

import { plural } from '../../util/string';
import { formatFileNameRelativeToProject } from '../format/formatFileNameRelativeToProject';
import { logError } from '../logger/logError';
import { logInfo } from '../logger/logInfo';
import { logMessage } from '../logger/logMessage';

import { hintExpandPattern } from './hintExpandPattern';
import { shouldExpand } from './shouldExpand';

const logListWithErrors = (compiler: CompilerContext) => {
    logError('Errors generating source code');
    compiler.generatedSourceFiles.forEach(({ fileName, skipped, success, time }) => {
        const formatedFileName = formatFileNameRelativeToProject(compiler, fileName, success);
        const t = ' ' + yellow((time || 0) + 'ms');
        if (skipped) {
            logMessage(gray(' (skipped)'), gray(formatedFileName));
        } else if (success) {
            logMessage(green('         √'), formatedFileName + t);
        } else {
            logMessage(red('   (error)'), red(formatedFileName) + t);
        }
    });
};

const logListWithoutErrors = (compiler: CompilerContext) => {
    const hint = hintExpandPattern(compiler, 'generated');
    const count = compiler.generatedSourceFiles.length;
    const formatted = yellow(count) + plural(count, ' file');
    logInfo('Generated sources', formatted, hint);

    if (shouldExpand(compiler, 'generated')) {
        const hasSkipped =
            compiler.generatedSourceFiles.filter(({ skipped }) => !!skipped).length > 0;
        const prefix = hasSkipped ? '          ' : '  ';
        compiler.generatedSourceFiles.forEach(({ fileName, skipped, time }) => {
            const t = ' ' + yellow((time || 0) + 'ms');
            if (skipped) {
                logMessage(
                    gray(' (skipped)'),
                    gray(formatFileNameRelativeToProject(compiler, fileName)),
                );
            } else {
                logMessage(prefix, formatFileNameRelativeToProject(compiler, fileName, true) + t);
            }
        });
        console.info(' ');
    }
};

export const logGeneratedSourceFiles = (compiler: CompilerContext): void => {
    const errors = compiler.generatedSourceFiles.filter(
        ({ success, skipped }) => !success && !skipped,
    );
    if (errors.length) {
        logListWithErrors(compiler);
    } else if (compiler.generatedSourceFiles.length) {
        logListWithoutErrors(compiler);
    }
};

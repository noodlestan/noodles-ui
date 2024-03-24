import { ProjectContext } from '@noodles-ui/support-types';
import { gray, green, red, yellow } from 'kleur';

import { plural } from '../../util/string';
import { formatFileNameRelativeToProject } from '../format/formatFileNameRelativeToProject';
import { logError } from '../logger/logError';
import { logInfo } from '../logger/logInfo';
import { logMessage } from '../logger/logMessage';

import { hintExpandPattern } from './hintExpandPattern';
import { shouldExpand } from './shouldExpand';

const logListWithErrors = (project: ProjectContext) => {
    logError('Errors generating source code');
    project.generatedSourceFiles.forEach(({ fileName, skipped, success }) => {
        const formatedFileName = formatFileNameRelativeToProject(project, fileName, success);
        if (skipped) {
            logMessage(gray(' (skipped)'), gray(formatedFileName));
        } else if (success) {
            logMessage(green('          '), formatedFileName);
        } else {
            logMessage(red('   (error)'), red(formatedFileName));
        }
    });
};

const logListWithoutErrors = (project: ProjectContext) => {
    const hint = hintExpandPattern(project, 'generated');
    const count = project.generatedSourceFiles.length;
    const formatted = yellow(count) + plural(count, ' file');
    logInfo('Generated sources', formatted, hint);

    if (shouldExpand(project, 'generated')) {
        const hasSkipped =
            project.generatedSourceFiles.filter(({ skipped }) => !!skipped).length > 0;
        const prefix = hasSkipped ? '          ' : '  ';
        project.generatedSourceFiles.forEach(({ fileName, skipped }) => {
            if (skipped) {
                logMessage(
                    gray(' (skipped)'),
                    gray(formatFileNameRelativeToProject(project, fileName)),
                );
            } else {
                logMessage(prefix, formatFileNameRelativeToProject(project, fileName, true));
            }
        });
        console.info(' ');
    }
};

export const logGeneratedSourceFiles = (project: ProjectContext): void => {
    const errors = project.generatedSourceFiles.filter(
        ({ success, skipped }) => !success && !skipped,
    );
    if (errors.length) {
        logListWithErrors(project);
    } else if (project.generatedSourceFiles.length) {
        logListWithoutErrors(project);
    }
};

import { ProjectContext } from '@noodles-ui/support-types';
import { gray, green, red } from 'kleur';

import { formatFileNameRelativeToProject } from '../format/formatFileNameRelativeToProject';
import { logError } from '../logger/logError';
import { logInfo } from '../logger/logInfo';
import { logMessage } from '../logger/logMessage';

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
    logInfo('Generated sources');
    const hasSkipped = project.generatedSourceFiles.filter(({ skipped }) => !!skipped).length > 0;
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

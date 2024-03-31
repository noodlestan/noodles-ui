import {
    CompilerContext,
    getBuildErrorMessage,
    getBuildFilesWithErrors,
} from '@noodles-ui/core-compiler';

import { formatFileNameRelativeToProject } from '../format/formatFileNameRelativeToProject';
import { logError } from '../logger/logError';
import { logMessage } from '../logger/logMessage';
import { logSuccess } from '../logger/logSuccess';

export const logBuildOutcome = (compiler: CompilerContext): void => {
    const { build } = compiler;
    const { success } = build;

    if (success) {
        logSuccess('TS build success');
        return;
    }

    const message = getBuildErrorMessage(compiler.build);
    logError(message);

    const uniqueFiles = getBuildFilesWithErrors(compiler.build);
    const files = Array.from(uniqueFiles.values());
    files.forEach(file => logMessage(' - ', formatFileNameRelativeToProject(compiler, file, true)));
    if (files.length) {
        console.info(' ');
    }
};

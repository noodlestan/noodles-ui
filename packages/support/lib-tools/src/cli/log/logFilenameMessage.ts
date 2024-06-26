import { CompilerContext } from '@noodles-ui/core-compiler';

import { formatFileNameRelativeToProject } from '../format/formatFileNameRelativeToProject';
import { logMessage } from '../logger/logMessage';

export const logFilenameMessage = (
    compiler: CompilerContext,
    message: string,
    filename: string,
): void => {
    logMessage(message, formatFileNameRelativeToProject(compiler, filename, true));
};

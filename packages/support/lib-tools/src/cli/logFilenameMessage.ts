import { ProgramModuleContext } from '../types/program';

import { formatFileName } from './formatFileName';
import { logMessage } from './logMessage';

export const logFilenameMessage = (
    modules: Map<string, ProgramModuleContext>,
    message: string,
    filename: string,
): void => {
    logMessage(message, formatFileName(modules, filename, true));
};

import { ProgramModuleContext } from '../../types/program';
import { formatFileName } from '../format/formatFileName';
import { logMessage } from '../logger/logMessage';

export const logFilenameMessage = (
    modules: Map<string, ProgramModuleContext>,
    message: string,
    filename: string,
): void => {
    logMessage(message, formatFileName(modules, filename, true));
};

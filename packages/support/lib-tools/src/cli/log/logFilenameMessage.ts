import { ProgramModuleContext } from '../../types/program';
import { formatFileNameRelativeToProject } from '../format/formatFileNameRelativeToProject';
import { logMessage } from '../logger/logMessage';

export const logFilenameMessage = (
    modules: Map<string, ProgramModuleContext>,
    message: string,
    filename: string,
): void => {
    logMessage(message, formatFileNameRelativeToProject(modules, filename, true));
};

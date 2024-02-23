import { logMessage } from './logMessage';
import { stripFilename } from './stripFilename';

export const logFilenameMessage = (
    message: string,
    filename: string,
    pathToStrip?: string,
): void => {
    logMessage(message, stripFilename(filename, pathToStrip));
};

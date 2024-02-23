import { logFilenameMessage } from './logFilenameMessage';

export const logFilelist = (prefix: string, filenames: string[], pathToStrip?: string): void => {
    filenames.forEach(filename => logFilenameMessage(prefix, filename, pathToStrip));
};

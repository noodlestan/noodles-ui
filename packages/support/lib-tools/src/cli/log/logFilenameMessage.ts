import { ProjectContext } from '../../types/projects';
import { formatFileNameRelativeToProject } from '../format/formatFileNameRelativeToProject';
import { logMessage } from '../logger/logMessage';

export const logFilenameMessage = (
    project: ProjectContext,
    message: string,
    filename: string,
): void => {
    logMessage(message, formatFileNameRelativeToProject(project, filename, true));
};

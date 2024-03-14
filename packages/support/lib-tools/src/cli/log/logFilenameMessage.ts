import { ProjectContext } from '@noodles-ui/support-types';

import { formatFileNameRelativeToProject } from '../format/formatFileNameRelativeToProject';
import { logMessage } from '../logger/logMessage';

export const logFilenameMessage = (
    project: ProjectContext,
    message: string,
    filename: string,
): void => {
    logMessage(message, formatFileNameRelativeToProject(project, filename, true));
};

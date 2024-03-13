import { ProjectContext } from '../../types/projects';

import { logFilenameMessage } from './logFilenameMessage';

export const logFilelist = (project: ProjectContext, prefix: string, filenames: string[]): void => {
    filenames.forEach(filename => logFilenameMessage(project, prefix, filename));
    if (filenames.length) {
        console.info('');
    }
};

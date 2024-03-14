import { ProjectContext } from '@noodles-ui/support-types';

import { logFilenameMessage } from './logFilenameMessage';

export const logFileNamesList = (
    project: ProjectContext,
    prefix: string,
    filenames: string[],
): void => {
    filenames.forEach(filename => logFilenameMessage(project, prefix, filename));
    if (filenames.length) {
        console.info('');
    }
};

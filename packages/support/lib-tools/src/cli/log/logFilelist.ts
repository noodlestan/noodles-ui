import { ProgramModuleContext } from '../../types/program';

import { logFilenameMessage } from './logFilenameMessage';

export const logFilelist = (
    modules: Map<string, ProgramModuleContext>,
    prefix: string,
    filenames: string[],
): void => {
    filenames.forEach(filename => logFilenameMessage(modules, prefix, filename));
    if (filenames.length) {
        console.info('');
    }
};

import { CompilerContext } from '@noodles-ui/support-types';

import { logFilenameMessage } from './logFilenameMessage';

export const logFileNamesList = (
    compiler: CompilerContext,
    prefix: string,
    filenames: string[],
): void => {
    filenames.forEach(filename => logFilenameMessage(compiler, prefix, filename));
    if (filenames.length) {
        console.info('');
    }
};

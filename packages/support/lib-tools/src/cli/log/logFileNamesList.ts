import { CompilerContext } from '@noodles-ui/core-compiler';

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

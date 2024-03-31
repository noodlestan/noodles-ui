import { join } from 'path';

import { CompilerContext } from '../../types';

export const getProjectFilenamesWatchlist = (compiler: CompilerContext): string[] => {
    return Array.from(compiler.build.modules.values()).flatMap(
        module => module.filenames.map(filename => join(module.path, filename)),
        // .map(f => f.fileName.replace('.d.', '.').replace('/dist/', '/src/'));
        // .map(f => f.fileName),
    );
};

import { CompilerContext } from '@noodles-ui/support-types';

import { formatFileName } from '../../cli/format/formatFileName';

export const tsFileHeader = (compiler: CompilerContext, fileName: string): string => {
    return (
        [
            '/**',
            ' * noodles-ui / auto-generated',
            ' *',
            ` * ${compiler.build.timestamp.toISOString()}`,
            ` * ${formatFileName(compiler, fileName)}`,
            ` */`,
        ].join('\n') + '\n\n'
    );
};

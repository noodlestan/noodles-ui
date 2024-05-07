import { join } from 'path';

import { CompilerContext } from '@noodles-ui/core-compiler';
import { gray, green } from 'kleur';

import { relativePath } from '../../util/relativePath';
import { logMessage } from '../logger/logMessage';

export const logProjectBasicInfo = (compiler: CompilerContext): void => {
    if (compiler.rootPath) {
        logMessage(green('<root>'), relativePath(compiler.projectPath, compiler.rootPath));
        logMessage(
            green('<project>'),
            join('<root>', relativePath(compiler.rootPath, compiler.projectPath)),
        );
    }

    if (compiler.interactive.expand.length) {
        logMessage(gray('expand:'), compiler.interactive.expand);
    }

    if (!compiler.interactive.hints && !compiler.interactive.expand.length) {
        console.info('');
        logMessage(gray('  use "--hints" to know which details can be expanded'));
    }

    console.info('');
};

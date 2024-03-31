import { CompilerContext } from '@noodles-ui/support-types';
import { gray, green } from 'kleur';

import { logMessage } from '../logger/logMessage';

export const logProjectBasicInfo = (compiler: CompilerContext): void => {
    if (compiler.rootPath) {
        logMessage(green('<root>'), compiler.rootPath);
    }
    logMessage(green('<project>'), compiler.projectPath);

    if (compiler.interactive.expand.length) {
        logMessage(gray('expand:'), compiler.interactive.expand);
    }

    if (!compiler.interactive.hints && !compiler.interactive.expand.length) {
        console.info('');
        logMessage(gray('  use "--hints" to know which details can be expanded'));
    }

    console.info('');
};

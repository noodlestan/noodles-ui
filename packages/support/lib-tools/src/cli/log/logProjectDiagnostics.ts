import { CompilerContext } from '@noodles-ui/support-types';

import { logProjectDiagnostic } from './logProjectDiagnostic';

export const logProjectDiagnostics = (compiler: CompilerContext): void => {
    const { diagnostics } = compiler;

    diagnostics.forEach(diagnostic => {
        logProjectDiagnostic(compiler, diagnostic);
    });

    if (diagnostics.length) {
        console.info('');
    }
};

import { ProjectContext } from '@noodles-ui/support-types';

import { logProjectDiagnostic } from './logProjectDiagnostic';

export const logProjectDiagnostics = (project: ProjectContext): void => {
    const { diagnostics } = project;

    diagnostics.forEach(diagnostic => {
        logProjectDiagnostic(project, diagnostic);
    });

    if (diagnostics.length) {
        console.info('');
    }
};

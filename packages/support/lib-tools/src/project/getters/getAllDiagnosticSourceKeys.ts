import { ProjectContext } from '@noodles-ui/support-types';

import { getDiagnosticKey } from '../../cli/log/getDiagnosticKey';

export const getAllDiagnosticSourceKeys = (project: ProjectContext): string[] => {
    const set = project.diagnostics.reduce((acc, diagnostic) => {
        const sourceKey = getDiagnosticKey(project, diagnostic.source);
        acc.add(sourceKey);
        return acc;
    }, new Set<string>());

    return Array.from(set.values());
};

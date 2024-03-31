import { ProjectDiagnostic } from '../types';

import { getDiagnosticKey } from './getDiagnosticKey';

export const getAllDiagnosticSourceKeys = (diagnostics: ProjectDiagnostic[] = []): string[] => {
    const emptySet = new Set<string>();
    const set =
        diagnostics.reduce((acc, diagnostic) => {
            const sourceKey = getDiagnosticKey(diagnostic.source);
            acc.add(sourceKey);
            return acc;
        }, emptySet) || emptySet;

    return Array.from(set.values());
};

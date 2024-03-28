import { ProjectDiagnostic } from './types';

export const getDiagnosticWarnings = (
    diagnostics: ProjectDiagnostic[] = [],
): ProjectDiagnostic[] => {
    return diagnostics.filter(entry => entry.severity === 'warning') || [];
};

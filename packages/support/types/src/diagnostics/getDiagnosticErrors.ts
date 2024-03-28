import { ProjectDiagnostic } from './types';

export const getDiagnosticErrors = (diagnostics: ProjectDiagnostic[] = []): ProjectDiagnostic[] => {
    return diagnostics.filter(entry => entry.severity === 'error') || [];
};

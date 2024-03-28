import { ProjectDiagnostic } from './types';

export const hasDiagnostics = (diagnostics: ProjectDiagnostic[] = []): boolean => {
    return diagnostics.length > 0;
};

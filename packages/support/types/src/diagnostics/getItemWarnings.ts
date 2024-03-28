import { getDiagnosticKey } from './getDiagnosticKey';
import { ProjectDiagnostic } from './types';

export const getItemWarnings = (
    key: string,
    diagnostics: ProjectDiagnostic[] = [],
): ProjectDiagnostic[] => {
    return diagnostics.filter(
        item => getDiagnosticKey(item.source) === key && item.severity === 'warning',
    );
};

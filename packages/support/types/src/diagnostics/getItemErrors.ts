import { getDiagnosticKey } from './getDiagnosticKey';
import { ProjectDiagnostic } from './types';

export const getItemErrors = (
    key: string,
    diagnostics: ProjectDiagnostic[] = [],
): ProjectDiagnostic[] => {
    return diagnostics.filter(
        item => getDiagnosticKey(item.source) === key && item.severity === 'error',
    );
};

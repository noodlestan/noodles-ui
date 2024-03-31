import { ProjectDiagnostic } from '../types';

import { getDiagnosticKey } from './getDiagnosticKey';

export const getItemDiagnostics = (
    key: string,
    diagnostics: ProjectDiagnostic[] = [],
): ProjectDiagnostic[] => {
    return diagnostics.filter(item => getDiagnosticKey(item.source) === key);
};

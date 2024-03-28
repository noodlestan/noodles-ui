import { getDiagnosticKey } from './getDiagnosticKey';
import { getDiagnosticWarnings } from './getDiagnosticWarnings';
import { ProjectDiagnostic } from './types';

type ItemsWithWarnings = {
    [key: string]: number;
};

export const getItemsWithWarnings = (diagnostics: ProjectDiagnostic[] = []): ItemsWithWarnings => {
    return getDiagnosticWarnings(diagnostics).reduce((acc, item) => {
        const sourceKey = getDiagnosticKey(item.source);
        acc[sourceKey] = acc[sourceKey] || 0;
        acc[sourceKey]++;
        return acc;
    }, {} as ItemsWithWarnings);
};

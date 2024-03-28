import { getDiagnosticErrors } from './getDiagnosticErrors';
import { getDiagnosticKey } from './getDiagnosticKey';
import { ProjectDiagnostic } from './types';

type ItemsWithErrors = {
    [key: string]: number;
};

export const getItemsWithErrors = (diagnostics: ProjectDiagnostic[] = []): ItemsWithErrors => {
    return getDiagnosticErrors(diagnostics).reduce((acc, item) => {
        const sourceKey = getDiagnosticKey(item.source);
        acc[sourceKey] = acc[sourceKey] || 0;
        acc[sourceKey]++;
        return acc;
    }, {} as ItemsWithErrors);
};

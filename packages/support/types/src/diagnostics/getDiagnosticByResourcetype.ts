import { resourceFromDiagnosticSource } from './resourceFromDiagnosticSource';
import { ProjectDiagnostic } from './types';

export const getDiagnosticByResourcetype = (
    type: string,
    diagnostics: ProjectDiagnostic[] = [],
): ProjectDiagnostic[] => {
    return (
        diagnostics?.filter(item => {
            const resource = resourceFromDiagnosticSource(item.source);
            if (resource) {
                return resource.type === type;
            }
            return false;
        }) || []
    );
};

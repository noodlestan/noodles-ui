import { ProjectDiagnostic } from '../types';

import { resourceFromDiagnosticSource } from './resourceFromDiagnosticSource';

export const getDiagnosticByResourceType = (
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

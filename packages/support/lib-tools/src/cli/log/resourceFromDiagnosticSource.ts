import { ProjectDiagnosticSource } from '@noodles-ui/core-diagnostics';
import { UnknownResource } from '@noodles-ui/core-resources';

export const resourceFromDiagnosticSource = (
    source: ProjectDiagnosticSource,
): UnknownResource | undefined => {
    if (typeof source === 'object' && source) {
        if ('type' in source || 'reference' in source || 'extend' in source) {
            return source as UnknownResource;
        }
    }
};

import { ProjectDiagnosticSource, UnknownResource } from '@noodles-ui/support-types';

export const resourceFromDiagnosticSource = (
    source: ProjectDiagnosticSource,
): UnknownResource | undefined => {
    if (typeof source === 'object' && source) {
        if ('type' in source || 'reference' in source || 'extend' in source) {
            return source as UnknownResource;
        }
    }
};

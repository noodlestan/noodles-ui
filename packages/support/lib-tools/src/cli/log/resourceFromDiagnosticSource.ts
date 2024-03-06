import { ProjectDiagnosticSource } from '../../types/projects';
import { UnknownResource } from '../../types/resources';

export const resourceFromDiagnosticSource = (
    source: ProjectDiagnosticSource,
): UnknownResource | undefined => {
    if (typeof source === 'object' && source) {
        if ('type' in source || 'reference' in source || 'extend' in source) {
            return source as UnknownResource;
        }
    }
};

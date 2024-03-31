import { Resource } from '@noodles-ui/core-resources';

import { ProjectDiagnosticSource } from '../types';

export const resourceFromDiagnosticSource = (
    source: ProjectDiagnosticSource,
): Resource<string> | undefined => {
    if (typeof source === 'object' && source) {
        if ('type' in source && 'name' in source && 'module' in source) {
            return source as Resource<string>;
        }
    }
};

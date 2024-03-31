import { ProjectDiagnosticFileError, ProjectDiagnosticSource } from '../types';

export const fileErrorFromDiagnosticSource = (
    source: ProjectDiagnosticSource,
): ProjectDiagnosticFileError | undefined => {
    if (typeof source === 'object' && source) {
        if ('fileName' in source && 'line' in source && 'column' in source) {
            return source as ProjectDiagnosticFileError;
        }
    }
};

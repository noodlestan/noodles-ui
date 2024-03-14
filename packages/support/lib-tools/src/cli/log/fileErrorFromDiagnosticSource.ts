import { ProjectDiagnosticFileError, ProjectDiagnosticSource } from '@noodles-ui/support-types';

export const fileErrorFromDiagnosticSource = (
    source: ProjectDiagnosticSource,
): ProjectDiagnosticFileError | undefined => {
    if (typeof source === 'object' && source) {
        if ('fileName' in source && 'line' in source && 'column' in source) {
            return source as ProjectDiagnosticFileError;
        }
    }
};

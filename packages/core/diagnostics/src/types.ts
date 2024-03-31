import { UnknownResource } from '@noodles-ui/core-resources';

export type ProjectDiagnosticSource = string | UnknownResource | ProjectDiagnosticFileError;

export type ProjectDiagnosticSeverity = 'error' | 'warning';

export type ProjectDiagnostic = {
    severity: ProjectDiagnosticSeverity;
    message: string;
    source: ProjectDiagnosticSource;
    data?: unknown;
};

export type ProjectDiagnosticFileError = {
    fileName: string;
    line: number;
    column: number;
    sourceCode?: string;
};
export type ProjectDiagnostics = {
    diagnostics: ProjectDiagnostic[];
};

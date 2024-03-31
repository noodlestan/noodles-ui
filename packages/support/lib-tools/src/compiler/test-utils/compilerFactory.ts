import {
    CompilerContext,
    GeneratedSourceFile,
    ProjectDiagnostic,
    ProjectDiagnosticSeverity,
    ProjectDiagnosticSource,
} from '@noodles-ui/support-types';
import ts from 'typescript';

export const compilerFactory = (overides?: Partial<CompilerContext>): CompilerContext => {
    const diagnostics: ProjectDiagnostic[] = [];
    const generatedSourceFiles = [];

    const diagnosticFn =
        (severity: ProjectDiagnosticSeverity) =>
        (source: ProjectDiagnosticSource, message: string, data?: unknown) =>
            diagnostics.push({
                severity,
                message,
                source,
                data,
            });

    const hasErrors = () => diagnostics.filter(d => d.severity === 'error').length > 0;
    const compileProjectFile = async () => undefined;
    const addGeneratedSourceFile = (source: GeneratedSourceFile) =>
        generatedSourceFiles.push(source);

    return {
        projectFile: '',
        projectPath: '',
        build: {
            program: {} as ts.Program,
            success: true,
            result: {} as ts.EmitResult,
            diagnostics: [],
            timestamp: new Date(),
            files: [],
            fileNames: [],
            modules: new Map(),
        },
        diagnostics,
        addError: diagnosticFn('error'),
        addWarning: diagnosticFn('warning'),
        hasErrors,
        interactive: {
            expand: [],
            hints: false,
        },
        rootPath: '',

        compileProjectFile,
        generatedSourceFiles: [{ fileName: '' }],
        addGeneratedSourceFile,
        entities: {
            project: new Map(),
            surface: new Map(),
            theme: new Map(),
            component: new Map(),
            variant: new Map(),
            token: new Map(),
            mixin: new Map(),
        },
        ...overides,
    };
};

import {
    GeneratedSourceFile,
    ProjectContext,
    ProjectDiagnostic,
    ProjectDiagnosticSource,
} from '@noodles-ui/support-types';
import ts from 'typescript';

export const projectFactory = (overides?: Partial<ProjectContext>): ProjectContext => {
    const diagnostics: ProjectDiagnostic[] = [];
    const generatedSourceFiles = [];

    const addDiagnostic = (source: ProjectDiagnosticSource, message: string, data?: unknown) =>
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        diagnostics.push({
            message,
            source,
            data,
        });
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
            modules: new Map(),
        },
        diagnostics,
        addDiagnostic,
        interactive: {
            expand: [],
            hints: false,
        },
        rootPath: '',
        resource: {
            name: '',
            module: '',
        },
        compileProjectFile,
        generatedSourceFiles: [{ fileName: '' }],
        addGeneratedSourceFile,
        entities: {
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

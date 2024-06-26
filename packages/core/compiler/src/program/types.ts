import ts from 'typescript';

export type ProgramModuleContext = ProgramModule & {
    filenames: string[];
};

export type BuildResources = {
    fileNames: string[];
    modules: Map<string, ProgramModuleContext>;
};

export type CompileResult = {
    program: ts.Program;
    success: boolean;
    result: ts.EmitResult;
    diagnostics: ts.Diagnostic[];
};

export type BuildContext = BuildResources &
    Partial<CompileResult> & {
        files: ts.SourceFile[];
        timestamp: Date;
    };

export type ProgramModule = {
    name: string;
    path: string;
};

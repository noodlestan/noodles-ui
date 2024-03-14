import ts from 'typescript';

export type CompileResult = {
    program: ts.Program;
    success: boolean;
    result: ts.EmitResult;
    diagnostics: ts.Diagnostic[];
};

export type BuildContext = Partial<CompileResult> & {
    files: ts.SourceFile[];
    modules: Map<string, ProgramModuleContext>;
    timestamp: Date;
};

export type ProgramModule = {
    name: string;
    path: string;
};

export type ProgramModuleContext = ProgramModule & {
    filenames: string[];
};

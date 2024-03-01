import ts from 'typescript';

export type CompileResult = {
    program: ts.Program;
    success: boolean;
    result: ts.EmitResult;
    diagnostics: ts.Diagnostic[];
};

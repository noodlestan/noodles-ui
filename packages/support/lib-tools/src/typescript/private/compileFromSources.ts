import ts from 'typescript';

import { getCompilerOptions } from '../getCompilerOptions';
import { CompileResult } from '../types';

export const compileFromSources = (inputFiles: string[]): CompileResult => {
    const { options } = getCompilerOptions();
    options.emitOnError = true;
    options.target = ts.ScriptTarget.ES2020;
    options.module = ts.ModuleKind.CommonJS;
    options.sourceMap = false;
    options.declaration = false;
    options.outDir = '.nui/build/';
    options.strict = true;
    const host = ts.createCompilerHost(options);
    // const createdFiles: { [fileName: string]: string } = {};
    // host.writeFile = (fileName: string, contents: string) => (createdFiles[fileName] = contents);

    const program = ts.createProgram(inputFiles, options, host);
    const result = program.emit();

    const diagnostics = ts.getPreEmitDiagnostics(program).concat(result.diagnostics);
    const success = !diagnostics.length;

    return { result, program, success, diagnostics };
};

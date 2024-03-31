import ts from 'typescript';

import { CompileResult } from '../../program/types';
import { getCompilerOptions } from '../getCompilerOptions';

export const compileFromSources = (inputFiles: string[]): CompileResult => {
    const { options } = getCompilerOptions();
    options.emitOnError = true;
    options.target = ts.ScriptTarget.ES2020;
    options.module = ts.ModuleKind.CommonJS;
    options.sourceMap = false;
    options.declaration = false;
    // options.outDir = '.nui/build/';
    options.strict = true;
    const host = ts.createCompilerHost(options);
    // const createdFiles: { [fileName: string]: string } = {};
    // host.writeFile = (fileName: string, contents: string) => (createdFiles[fileName] = contents);

    // NOTE we can output the compiled files but by default you only get files
    // from `src/`, therefore to guarantee  that the compiled resource files are
    // emitted we have to manually feed the list of '.nui' files to `createProgram()
    // We can do this by as easy as 1 2 3
    // - compileFromSources(programFile)
    // - allSources = getSourceFiles + isResourceFile
    // - compileFromSources(allSources)
    host.writeFile = () => undefined;

    const program = ts.createProgram(inputFiles, options, host);
    const result = program.emit();

    const diagnostics = ts.getPreEmitDiagnostics(program).concat(result.diagnostics);
    const success = !diagnostics.length;

    return { result, program, success, diagnostics };
};

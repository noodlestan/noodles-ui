import { CompileResult } from '@noodles-ui/support-types';
import ts from 'typescript';

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
    // from `src/`, theregore to guarantee  thatt´all compiled resource files are
    // emitted we have to manually the '.nui' files to∂ `createProgram()
    // We can do this by as easy as 1 2 3
    // - compileFromSources(prgroamFile)
    // - allSources = getSourceFiles + isResourceFile
    // - compileFromSources(allsources)
    host.writeFile = () => undefined;

    const program = ts.createProgram(inputFiles, options, host);
    const result = program.emit();

    const diagnostics = ts.getPreEmitDiagnostics(program).concat(result.diagnostics);
    const success = !diagnostics.length;

    return { result, program, success, diagnostics };
};

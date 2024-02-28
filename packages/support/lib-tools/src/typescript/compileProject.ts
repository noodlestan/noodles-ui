// import { dirname, join } from 'path';

import { mkdir, writeFile } from 'fs/promises';
import { dirname } from 'path';

import ts from 'typescript';

import { getCompilerOptions } from './getCompilerOptions';

export const compileProject = async (projectFile: string): Promise<ts.Program> => {
    const { options } = getCompilerOptions();
    options.emitOnError = true;
    options.target = ts.ScriptTarget.ES2020;
    options.module = ts.ModuleKind.CommonJS;
    options.sourceMap = false;
    options.declaration = false;
    options.outDir = '.nui/build/';
    // options.esModuleInterop = true;
    options.strict = true;
    const host = ts.createCompilerHost(options);
    console.log(options);
    const createdFiles: { [fileName: string]: string } = {};
    host.writeFile = (fileName: string, contents: string) => (createdFiles[fileName] = contents);

    const program = ts.createProgram(
        [
            projectFile,
            '/Users/andretorgal/sources/noodlestan/noodles-ui/packages/core/unstyled/src/index.nui.ts',
            '/Users/andretorgal/sources/noodlestan/noodles-ui/packages/core/styled/src/index.nui.ts',
        ],
        options,
        host,
    );
    const result = program.emit();

    const files = program.getSourceFiles().map(f => f.fileName);

    console.log('--> emit', {
        projectFile,
        createdFiles: Object.keys(createdFiles),
        index: '.nui/build/libs/sandbox-ui/src/nui/SandboxUI.nui.js',
        indexFile: createdFiles['.nui/build/libs/sandbox-ui/src/nui/SandboxUI.nui.js'],
        componentFile:
            createdFiles['.nui/build/core/unstyled/src/components/Heading/Heading.nui.js'],
        result,
        files: files.length,
    });

    const diagnostics = ts.getPreEmitDiagnostics(program).concat(result.diagnostics);

    diagnostics.forEach(diagnostic => {
        const { file, messageText, ...rest } = diagnostic;
        const f = file ? file.fileName : undefined;
        const m = typeof messageText === 'object' ? messageText.messageText : messageText;
        console.log('--> message', f, m, rest);
    });

    if (!diagnostics.length) {
        const p = Object.entries(createdFiles).map(async ([name, contents]) => {
            await mkdir(dirname(name), { recursive: true });
            writeFile(name, contents);
        });
        await Promise.all(p);
    }

    // TODO SAVE Project output as JSON ?

    // import data from './.nui/dist/Sandbox.nui.js';
    // build(data)
    // > modules
    // > components...

    return program;
};

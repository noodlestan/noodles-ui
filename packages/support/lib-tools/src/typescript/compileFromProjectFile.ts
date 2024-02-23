// import { dirname, join } from 'path';

import ts from 'typescript';

import { getCompilerOptions } from './getCompilerOptions';

export const compileFromProjectFile = async (projectFile: string): Promise<ts.Program> => {
    const options = getCompilerOptions();

    return await ts.createProgram([projectFile], options.options);
};

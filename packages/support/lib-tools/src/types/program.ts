import ts from 'typescript';

import { CompileResult } from '../typescript/types';

export type BuildContext = CompileResult & {
    files: ts.SourceFile[];
    modules: Map<string, ProgramModuleContext>;
};

export type ProgramModule = {
    name: string;
    path: string;
};

export type ProgramModuleContext = ProgramModule & {
    filenames: string[];
};

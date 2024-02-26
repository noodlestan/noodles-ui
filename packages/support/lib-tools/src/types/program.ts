import ts from 'typescript';

export type BuildContext = {
    program: ts.Program;
    modules: Map<string, ProgramModuleContext>;
};

export type ProgramModule = {
    name: string;
    path: string;
};

export type ProgramModuleContext = ProgramModule & {
    filenames: string[];
};

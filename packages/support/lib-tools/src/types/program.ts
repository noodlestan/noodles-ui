import ts from 'typescript';

export type BuildContext = {
    program: ts.Program;
    modules: Map<string, ProgramModuleContext>;
};

export type ProgramModuleContext = {
    name: string;
    path: string;
    filenames: string[];
};

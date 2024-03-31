import ts from 'typescript';

import { isResourceFile } from './isResourceFile';

export const getProgramResourceFiles = (program: ts.Program): ts.SourceFile[] => {
    return program.getSourceFiles().filter(file => isResourceFile(file.fileName));
};

import { CompilerContext } from '@noodles-ui/core-compiler';
import ts from 'typescript';

import { relativePath } from '../../../util/fs';
import { systemRootModuleFileName } from '../paths/systemRootModuleFileName';

const factory = ts.factory;

export const importRootScssModule = (
    compiler: CompilerContext,
    fileName: string,
    target: string,
): ts.Statement => {
    const rootCssFileName = systemRootModuleFileName(compiler, target);
    const cssRelativeFileName = relativePath(fileName, rootCssFileName);
    return factory.createImportDeclaration(
        undefined,
        factory.createImportClause(false, factory.createIdentifier('styles'), undefined),
        factory.createStringLiteral(cssRelativeFileName),
        undefined,
    );
};

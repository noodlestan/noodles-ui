import { CompilerContext } from '@noodles-ui/support-types';
import ts from 'typescript';

import { relativePath } from '../../../util/fs';
import { systemRootTokensFileName } from '../paths/systemRootTokensFileName';

const factory = ts.factory;

export const importRootCssTokens = (
    compiler: CompilerContext,
    fileName: string,
    target: string,
): ts.Statement => {
    const rootCssFileName = systemRootTokensFileName(compiler, target);
    const cssRelativeFileName = relativePath(fileName, rootCssFileName);
    return factory.createImportDeclaration(
        undefined,
        undefined,
        factory.createStringLiteral(cssRelativeFileName),
        undefined,
    );
};

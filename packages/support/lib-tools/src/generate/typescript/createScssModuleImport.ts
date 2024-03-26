import ts from 'typescript';

import { factory } from '../components/Components/ComponentPrivate/importComponentStyles';

export const createScssModuleImport = (scssModuleFileName: string): ts.ImportDeclaration => {
    return factory.createImportDeclaration(
        undefined,
        factory.createImportClause(false, factory.createIdentifier('styles'), undefined),
        factory.createStringLiteral(scssModuleFileName),
        undefined,
    );
};

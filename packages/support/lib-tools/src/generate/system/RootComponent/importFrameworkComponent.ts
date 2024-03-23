import ts from 'typescript';

const factory = ts.factory;

const FRAMEWORK = 'solid-js';

const namedImport = (name: string) =>
    factory.createImportSpecifier(false, undefined, factory.createIdentifier(name));

export const importFrameworkComponent = (): ts.ImportDeclaration => {
    const names = [namedImport('Component'), namedImport('JSX')];

    return factory.createImportDeclaration(
        undefined,
        factory.createImportClause(false, undefined, factory.createNamedImports(names)),
        factory.createStringLiteral(FRAMEWORK),
        undefined,
    );
};

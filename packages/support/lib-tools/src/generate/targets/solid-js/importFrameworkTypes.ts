import ts from 'typescript';

const factory = ts.factory;

const packageName = 'solid-js';

const namedImport = (name: string) =>
    factory.createImportSpecifier(false, undefined, factory.createIdentifier(name));

export const importFrameworkTypes = (jsx?: boolean): ts.ImportDeclaration => {
    const names = [namedImport('Component')];
    if (jsx) {
        names.push(namedImport('JSX'));
    }

    return factory.createImportDeclaration(
        undefined,
        factory.createImportClause(false, undefined, factory.createNamedImports(names)),
        factory.createStringLiteral(packageName),
        undefined,
    );
};

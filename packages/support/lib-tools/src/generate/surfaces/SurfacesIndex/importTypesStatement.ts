import ts from 'typescript';

const factory = ts.factory;

const namedImport = (name: string) =>
    factory.createImportSpecifier(false, undefined, factory.createIdentifier(name));

export const importTypesStatement = (): ts.ImportDeclaration => {
    const names = [namedImport('SurfaceResource')];

    return factory.createImportDeclaration(
        undefined,
        factory.createImportClause(false, undefined, factory.createNamedImports(names)),
        factory.createStringLiteral('@noodles-ui/core-types'),
        undefined,
    );
};

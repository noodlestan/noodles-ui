import ts from 'typescript';

const factory = ts.factory;

export const importFrameworkComponent = (): ts.ImportDeclaration => {
    return factory.createImportDeclaration(
        undefined,
        factory.createImportClause(
            false,
            undefined,
            factory.createNamedImports([
                factory.createImportSpecifier(
                    false,
                    undefined,
                    factory.createIdentifier('Component'),
                ),
            ]),
        ),
        factory.createStringLiteral('solid-js'),
        undefined,
    );
};

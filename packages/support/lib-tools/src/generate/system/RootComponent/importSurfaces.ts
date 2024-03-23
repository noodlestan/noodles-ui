import ts from 'typescript';

const factory = ts.factory;

export const importSurfaces = (): ts.Statement => {
    return factory.createImportDeclaration(
        undefined,
        factory.createImportClause(false, factory.createIdentifier('surfaces'), undefined),
        factory.createStringLiteral('./surfaces'),
        undefined,
    );
};

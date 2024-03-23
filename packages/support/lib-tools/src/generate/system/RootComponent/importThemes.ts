import ts from 'typescript';

const factory = ts.factory;

export const importThemes = (): ts.Statement => {
    return factory.createImportDeclaration(
        undefined,
        factory.createImportClause(false, factory.createIdentifier('themes'), undefined),
        factory.createStringLiteral('./themes'),
        undefined,
    );
};

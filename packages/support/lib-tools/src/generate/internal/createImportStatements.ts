import ts from 'typescript';

const factory = ts.factory;

const namedImport = (name: string) =>
    factory.createImportSpecifier(false, undefined, factory.createIdentifier(name));

const namedImportsfromModule = (library: string, names: string[]): ts.ImportDeclaration => {
    const namedImports = names.map(namedImport);

    return factory.createImportDeclaration(
        undefined,
        factory.createImportClause(false, undefined, factory.createNamedImports(namedImports)),
        factory.createStringLiteral(library),
        undefined,
    );
};

type ModuleName = string;
type NamedImport = string;
type TypeToImport = [ModuleName, NamedImport[]];

export type TypesToImport = Array<TypeToImport>;

export const createImportStatements = (types: TypesToImport): ts.ImportDeclaration[] => {
    return types.map(([moduleName, namedImports]) =>
        namedImportsfromModule(moduleName, namedImports),
    );
};

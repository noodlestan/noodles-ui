import ts from 'typescript';

const factory = ts.factory;

type ModuleName = string;
type NamedImport = string;
type DefaultImport = string;
type TypeToImport = [ModuleName, DefaultImport | NamedImport[]];

export type TypesToImport = Array<TypeToImport>;

const namedImport = (name: string) =>
    factory.createImportSpecifier(false, undefined, factory.createIdentifier(name));

const defaultImportfromModule = (moduleName: string, name: string): ts.ImportDeclaration => {
    return factory.createImportDeclaration(
        undefined,
        factory.createImportClause(false, factory.createIdentifier(name), undefined),
        factory.createStringLiteral(moduleName),
        undefined,
    );
};

const namedImportsfromModule = (moduleName: string, names: string[]): ts.ImportDeclaration => {
    const namedImports = names.map(namedImport);

    return factory.createImportDeclaration(
        undefined,
        factory.createImportClause(false, undefined, factory.createNamedImports(namedImports)),
        factory.createStringLiteral(moduleName),
        undefined,
    );
};

export const createImportStatements = (types: TypesToImport): ts.ImportDeclaration[] => {
    return types.map(([moduleName, defaultOrNamedImports]) =>
        typeof defaultOrNamedImports === 'string'
            ? defaultImportfromModule(moduleName, defaultOrNamedImports)
            : namedImportsfromModule(moduleName, defaultOrNamedImports),
    );
};

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

export const importInternalTypes = (): ts.ImportDeclaration[] => {
    const services = namedImportsfromModule('@noodles-ui/core-services', [
        'RootProvider, surfacesStore, themesStore',
    ]);
    const styled = namedImportsfromModule('@noodles-ui/core-styled', ['surfaceClassList']);
    const types = namedImportsfromModule('@noodles-ui/core-types', ['ColourSchemeName']);

    return [services, styled, types];
};

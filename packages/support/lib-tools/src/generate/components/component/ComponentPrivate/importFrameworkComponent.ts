import ts from 'typescript';

const factory = ts.factory;

const FRAMEWORK = 'solid-js';
const COMPONENT_TYPE = 'Component';

const namedImport = (name: string) =>
    factory.createImportSpecifier(false, undefined, factory.createIdentifier(name));

export const importFrameworkComponent = (importJSX: boolean): ts.ImportDeclaration => {
    const names = [namedImport(COMPONENT_TYPE)];

    if (importJSX) {
        names.push(namedImport('JSX'));
    }

    return factory.createImportDeclaration(
        undefined,
        factory.createImportClause(false, undefined, factory.createNamedImports(names)),
        factory.createStringLiteral(FRAMEWORK),
        undefined,
    );
};

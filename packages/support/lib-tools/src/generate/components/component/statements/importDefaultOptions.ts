import ts from 'typescript';

import { ComponentContextWithInstance } from '../../../../types/projects';

import { getPropDefaultConstantName } from './props/getPropDefaultConstantName';
import { getPropVariantsWithDefaultValues } from './props/getPropVariantsWithDefaultValues';

const factory = ts.factory;

export const importDefaultOptions = (component: ComponentContextWithInstance): ts.Statement[] => {
    const { instance } = component;
    const variantsWithDefaultValues = getPropVariantsWithDefaultValues(instance);

    if (!variantsWithDefaultValues.length) {
        return [];
    }

    const namedImports = variantsWithDefaultValues.map(variant => {
        const constantName = getPropDefaultConstantName(instance, variant);
        return factory.createImportSpecifier(
            false,
            undefined,
            factory.createIdentifier(constantName),
        );
    });
    return [
        factory.createImportDeclaration(
            undefined,
            factory.createImportClause(false, undefined, factory.createNamedImports(namedImports)),
            factory.createStringLiteral('./variants.constants'),
            undefined,
        ),
    ];
};

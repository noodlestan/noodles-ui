import { ComponentBuildContext } from '@noodles-ui/support-types';
import ts from 'typescript';

import { getPropDefaultConstantName } from '../../../../entities/component/prop/getters/getPropDefaultConstantName';
import { getPropVariantsWithDefaultValues } from '../../../../entities/component/prop/getters/getPropVariantsWithDefaultValues';

const factory = ts.factory;

export const importDefaultOptions = (component: ComponentBuildContext): ts.Statement[] => {
    const { entity } = component;
    const variantsWithDefaultValues = getPropVariantsWithDefaultValues(entity);

    if (!variantsWithDefaultValues.length) {
        return [];
    }

    const namedImports = variantsWithDefaultValues.map(variant => {
        const constantName = getPropDefaultConstantName(entity, variant);
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

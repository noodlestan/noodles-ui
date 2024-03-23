import { ComponentBuildContext } from '@noodles-ui/support-types';
import ts from 'typescript';

import { getPropVariantName } from '../../../../entities/component/prop/getters/getPropVariantName';
import { getVariantProps } from '../../../../entities/component/prop/getters/getVariantProps';
import { filterOutDuplicates } from '../../../../util/array';

const factory = ts.factory;

export const importVariantTypes = (component: ComponentBuildContext): ts.Statement[] => {
    const { entity } = component;
    const variants = getVariantProps(entity);

    if (!variants.length) {
        return [];
    }

    const variantNames = variants.map(getPropVariantName).filter(filterOutDuplicates);
    const namedImports = variantNames.map(variantName =>
        factory.createImportSpecifier(false, undefined, factory.createIdentifier(variantName)),
    );
    return [
        factory.createImportDeclaration(
            undefined,
            factory.createImportClause(false, undefined, factory.createNamedImports(namedImports)),
            factory.createStringLiteral('./variants.types'),
            undefined,
        ),
    ];
};

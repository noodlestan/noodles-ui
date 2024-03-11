import ts from 'typescript';

import { ComponentContextWithInstance } from '../../../../types/projects';

import { getPropVariantName } from './props/getPropVariantName';
import { getVariantProps } from './props/getVariantProps';

const factory = ts.factory;

const onlyUnique = (value: unknown, index: number, array: unknown[]) => {
    return array.indexOf(value) === index;
};

export const importVariantTypes = (component: ComponentContextWithInstance): ts.Statement[] => {
    const { instance } = component;
    const variants = getVariantProps(instance);

    if (!variants.length) {
        return [];
    }

    const variantNames = variants.map(getPropVariantName).filter(onlyUnique);
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

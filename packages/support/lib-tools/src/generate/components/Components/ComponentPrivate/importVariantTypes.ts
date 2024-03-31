import {
    ComponentBuildContext,
    getPropVariantName,
    getVariantProps,
} from '@noodles-ui/core-entities';
import ts from 'typescript';

import { filterOutDuplicates } from '../../../../util/array';
import { relativePath } from '../../../../util/fs';
import { variantsTypesFileName } from '../../../variants/paths/variantsTypesFileName';
import { componentFileName } from '../../paths/componentFileName';

const factory = ts.factory;

export const importVariantTypes = (
    component: ComponentBuildContext,
    targetDir: string,
): ts.Statement[] => {
    const { entity } = component;
    const variants = getVariantProps(entity);

    if (!variants.length) {
        return [];
    }

    const basePath = componentFileName(targetDir, component.entity);
    const fileName = variantsTypesFileName(targetDir);
    const path = relativePath(basePath, fileName, true);

    const variantNames = variants.map(getPropVariantName).filter(filterOutDuplicates);
    const namedImports = variantNames.map(variantName =>
        factory.createImportSpecifier(false, undefined, factory.createIdentifier(variantName)),
    );
    return [
        factory.createImportDeclaration(
            undefined,
            factory.createImportClause(false, undefined, factory.createNamedImports(namedImports)),
            factory.createStringLiteral(path),
            undefined,
        ),
    ];
};

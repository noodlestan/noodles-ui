import { ComponentBuildContext } from '@noodles-ui/support-types';
import ts from 'typescript';

import { getPropDefaultConstantName } from '../../../../entities/component/prop/getters/getPropDefaultConstantName';
import { getPropVariantsWithDefaultValues } from '../../../../entities/component/prop/getters/getPropVariantsWithDefaultValues';
import { relativePath } from '../../../../util/fs';
import { variantsConstantsFileName } from '../../../variants/paths/variantsConstantsFileName';
import { componentFileName } from '../../paths/componentFileName';

const factory = ts.factory;

export const importDefaultOptions = (
    component: ComponentBuildContext,
    targetDir: string,
): ts.Statement[] => {
    const { entity } = component;
    const variantsWithDefaultValues = getPropVariantsWithDefaultValues(entity);

    if (!variantsWithDefaultValues.length) {
        return [];
    }

    const basePath = componentFileName(targetDir, component.entity);
    const fileName = variantsConstantsFileName(targetDir);
    const path = relativePath(basePath, fileName, true);

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
            factory.createStringLiteral(path),
            undefined,
        ),
    ];
};

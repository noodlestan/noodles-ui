import { ComponentBuildContext } from '@noodles-ui/support-types';
import ts from 'typescript';

import { componentScssModuleBaseName } from '../../paths/componentScssModuleBaseName';

const factory = ts.factory;

export const importComponentStyles = (component: ComponentBuildContext): ts.ImportDeclaration => {
    const { entity } = component;
    const scssModuleFileName = `./` + componentScssModuleBaseName(entity);
    return factory.createImportDeclaration(
        undefined,
        factory.createImportClause(false, factory.createIdentifier('styles'), undefined),
        factory.createStringLiteral(scssModuleFileName),
        undefined,
    );
};

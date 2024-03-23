import { ComponentBuildContext } from '@noodles-ui/support-types';
import ts from 'typescript';

import { createScssModuleImport } from '../../../typescript/createScssModuleImport';
import { componentScssModuleBaseName } from '../../paths/componentScssModuleBaseName';

export const factory = ts.factory;

export const importComponentStyles = (component: ComponentBuildContext): ts.ImportDeclaration => {
    const { entity } = component;
    const scssModuleFileName = `./` + componentScssModuleBaseName(entity);
    return createScssModuleImport(scssModuleFileName);
};

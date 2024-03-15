import { ComponentBuildContext } from '@noodles-ui/support-types';
import ts from 'typescript';

const factory = ts.factory;

export const importComponentStyles = (component: ComponentBuildContext): ts.ImportDeclaration => {
    const { entity } = component;
    const name = entity.name || '';
    return factory.createImportDeclaration(
        undefined,
        factory.createImportClause(false, factory.createIdentifier('styles'), undefined),
        factory.createStringLiteral(`./component.${name}.module.scss`),
        undefined,
    );
};

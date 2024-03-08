import ts from 'typescript';

import { ComponentContextWithInstance } from '../../../types/projects';

const factory = ts.factory;

export const importComponentStyles = (
    component: ComponentContextWithInstance,
): ts.ImportDeclaration => {
    const { instance } = component;
    const name = instance.name || '';
    return factory.createImportDeclaration(
        undefined,
        factory.createImportClause(false, factory.createIdentifier('styles'), undefined),
        factory.createStringLiteral(`./${name}.module.scss`),
        undefined,
    );
};

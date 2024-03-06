import { ComponentResource } from '@noodles-ui/core-types';
import ts from 'typescript';

const factory = ts.factory;

export const importComponentStyles = (instance: ComponentResource): ts.ImportDeclaration => {
    const name = instance.name || '';
    return factory.createImportDeclaration(
        undefined,
        factory.createImportClause(false, factory.createIdentifier('styles'), undefined),
        factory.createStringLiteral(`./${name}.module.scss`),
        undefined,
    );
};

import { ComponentResource } from '@noodles-ui/core-types';
import ts from 'typescript';

import { WithInstance } from '../../../types/projects';

const factory = ts.factory;

export const importComponentStyles = (
    component: WithInstance<ComponentResource>,
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

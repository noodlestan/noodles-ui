import { ComponentGeneratedResource } from '@noodles-ui/core-types';
import ts, { PropertyName } from 'typescript';

import { factory } from '../exportComponent';

import { classListDeclaration } from './classListDeclaration';

const classListItem = (property: PropertyName) =>
    factory.createPropertyAssignment(property, factory.createTrue());

const componentClassName = (name: string): PropertyName =>
    factory.createComputedPropertyName(
        factory.createPropertyAccessExpression(
            factory.createIdentifier('styles'),
            factory.createIdentifier(name),
        ),
    );

const componentVariantClassName = (name: string, variant: string): PropertyName =>
    factory.createComputedPropertyName(
        factory.createPropertyAccessExpression(
            factory.createIdentifier('styles'),
            factory.createIdentifier(name + variant),
        ),
    );

export const componentClassListStatement = (instance: ComponentGeneratedResource): ts.Statement => {
    const name = instance.name || '';
    const objectLiteral = factory.createObjectLiteralExpression(
        [
            classListItem(componentClassName(name)),
            classListItem(componentVariantClassName(name, 'foo')),
        ],
        true,
    );

    const variableDeclarationList = classListDeclaration(objectLiteral);
    return factory.createVariableStatement(undefined, variableDeclarationList);
};

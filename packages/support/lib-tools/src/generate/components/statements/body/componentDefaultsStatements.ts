import { ComponentInstance, PropInstance } from '@noodles-ui/core-types';
import ts from 'typescript';

import { getPropDefaultConstantName } from '../props/getPropDefaultConstantName';
import { getPropsWithDefaultValues } from '../props/getPropsWithDefaultValues';

const factory = ts.factory;

const componentDefaultStatement = (
    instance: ComponentInstance,
    prop: PropInstance,
): ts.Statement => {
    const propName = prop.name;
    const constantName = getPropDefaultConstantName(instance, prop);

    const arrowFunction = factory.createArrowFunction(
        undefined,
        undefined,
        [],
        undefined,
        factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
        factory.createBinaryExpression(
            factory.createPropertyAccessExpression(
                factory.createIdentifier('props'),
                factory.createIdentifier(propName),
            ),
            factory.createToken(ts.SyntaxKind.BarBarToken),
            factory.createIdentifier(constantName),
        ),
    );

    const variableDeclaration = factory.createVariableDeclaration(
        factory.createIdentifier(propName),
        undefined,
        undefined,
        arrowFunction,
    );

    return factory.createVariableStatement(
        undefined,
        factory.createVariableDeclarationList([variableDeclaration], ts.NodeFlags.Const),
    );
};

export const componentDefaultsStatements = (instance: ComponentInstance): ts.Statement[] => {
    const propsWithDefaultValues = getPropsWithDefaultValues(instance);

    return propsWithDefaultValues.map(prop => componentDefaultStatement(instance, prop));
};

import {
    ComponentEntity,
    PropEntity,
    getPropDefaultConstantName,
    getPropsWithDefaultValues,
} from '@noodles-ui/core-entities';
import ts from 'typescript';

const factory = ts.factory;

const componentDefaultStatement = (entity: ComponentEntity, prop: PropEntity): ts.Statement => {
    const propName = prop.name;
    const constantName = getPropDefaultConstantName(entity, prop);

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

export const componentDefaultsStatements = (entity: ComponentEntity): ts.Statement[] => {
    const propsWithDefaultValues = getPropsWithDefaultValues(entity);

    return propsWithDefaultValues.map(prop => componentDefaultStatement(entity, prop));
};

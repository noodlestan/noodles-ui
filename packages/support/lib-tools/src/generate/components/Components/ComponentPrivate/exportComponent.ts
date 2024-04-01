import {
    ComponentBuildContext,
    ComponentOwnEntity,
    getComponentRenderedProps,
    getPropsWithDefaultValues,
} from '@noodles-ui/core-entities';
import ts, { JsxAttribute } from 'typescript';

import { componentClassListStatement } from './body/componentClassListStatement';
import { componentDefaultsStatements } from './body/componentDefaultsStatements';
import { componentRenderStatement } from './body/componentRenderStatement';

const factory = ts.factory;

const componentArrowFunction = (statements: ts.Statement[]): ts.Expression => {
    return factory.createArrowFunction(
        undefined,
        undefined,
        [
            factory.createParameterDeclaration(
                undefined,
                undefined,
                factory.createIdentifier('props'),
                undefined,
                undefined,
                undefined,
            ),
        ],
        undefined,
        factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
        factory.createBlock(statements, false),
    );
};

const expressionCallProp = (propName: string): ts.JsxAttribute => {
    return factory.createJsxAttribute(
        factory.createIdentifier(propName),
        factory.createJsxExpression(
            undefined,
            factory.createCallExpression(factory.createIdentifier(propName), undefined, []),
        ),
    );
};

const getPropsForRenderedComponent = (component: ComponentBuildContext): JsxAttribute[] => {
    const { entity } = component;
    const renderedProps = getComponentRenderedProps(entity as ComponentOwnEntity);
    const propsWithDefaults = getPropsWithDefaultValues(entity);

    const props = propsWithDefaults
        .filter(prop => prop.name in renderedProps)
        .map(prop =>
            factory.createJsxAttribute(
                factory.createIdentifier(prop.name),
                factory.createJsxExpression(
                    undefined,
                    factory.createCallExpression(
                        factory.createIdentifier(prop.name),
                        undefined,
                        [],
                    ),
                ),
            ),
        );

    const classListProp = expressionCallProp('classList');

    return [classListProp, ...props];
};

export const exportComponent = (component: ComponentBuildContext): ts.Statement => {
    const entity = component.entity as ComponentOwnEntity;
    const name = entity.name || '';
    const jsxProps = getPropsForRenderedComponent(component);

    const defaultsStatements = componentDefaultsStatements(entity);
    const classListStatement = componentClassListStatement(entity);
    const renderStatement = componentRenderStatement(entity, jsxProps);

    const statements: ts.Statement[] = [...defaultsStatements, classListStatement, renderStatement];
    const componentDeclaration = factory.createVariableDeclaration(
        factory.createIdentifier(name),
        undefined,
        factory.createTypeReferenceNode(factory.createIdentifier('Component'), [
            factory.createTypeReferenceNode(factory.createIdentifier(name + 'Props'), undefined),
        ]),
        componentArrowFunction(statements),
    );

    return factory.createVariableStatement(
        [factory.createToken(ts.SyntaxKind.ExportKeyword)],
        factory.createVariableDeclarationList([componentDeclaration], ts.NodeFlags.Const),
    );
};

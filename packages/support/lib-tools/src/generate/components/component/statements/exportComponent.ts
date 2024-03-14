import { ComponentOwnInstance } from '@noodles-ui/core-types';
import { ComponentContextWithInstance } from '@noodles-ui/support-types';
import ts, { JsxAttribute } from 'typescript';

import { getRenderedProps } from '../../../../project/components/extend/private/getRenderedProps';

import { componentClassListStatement } from './body/componentClassListStatement';
import { componentDefaultsStatements } from './body/componentDefaultsStatements';
import { componentRenderStatement } from './body/componentRenderStatement';
import { getPropsWithDefaultValues } from './props/getPropsWithDefaultValues';

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

const getPropsForRenderedComponent = (component: ComponentContextWithInstance): JsxAttribute[] => {
    const { instance } = component;
    const renderedProps = getRenderedProps(instance as ComponentOwnInstance);
    const propsWithDefaults = getPropsWithDefaultValues(instance);

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

export const exportComponent = (component: ComponentContextWithInstance): ts.Statement => {
    const instance = component.instance as ComponentOwnInstance;
    const name = instance.name || '';
    const jsxProps = getPropsForRenderedComponent(component);

    const defaultsStatements = componentDefaultsStatements(instance);
    const classListStatement = componentClassListStatement(instance);
    const renderStatement = componentRenderStatement(instance, jsxProps);

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

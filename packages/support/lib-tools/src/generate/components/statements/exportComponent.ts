import { ComponentOwnInstance } from '@noodles-ui/core-types';
import ts, { JsxAttributeLike } from 'typescript';

import { logInfo } from '../../../cli/logger/logInfo';
import { ComponentContextWithInstance } from '../../../types/projects';

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

const getPropsForRenderedComponent = (
    component: ComponentContextWithInstance,
): JsxAttributeLike[] => {
    const { resource, instance } = component;
    // TODO resolve props for rendered component
    for (const key in resource.props) {
        logInfo('getPropsForRenderedComponent()', key);
    }
    for (const key in instance.props) {
        logInfo('getPropsForRenderedComponent()', key);
    }

    const classListProp = expressionCallProp('classList');

    return [classListProp];
};

export const exportComponent = (component: ComponentContextWithInstance): ts.Statement => {
    const instance = component.instance as ComponentOwnInstance;
    const name = instance.name || '';
    const parentProps = getPropsForRenderedComponent(component);

    const defaultsStatements = componentDefaultsStatements(instance);
    const classListStatement = componentClassListStatement(instance);
    const renderStatement = componentRenderStatement(instance, parentProps);

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

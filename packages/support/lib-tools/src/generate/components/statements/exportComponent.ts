import { ComponentGeneratedResource, ComponentResource } from '@noodles-ui/core-types';
import ts, { JsxAttributeLike } from 'typescript';

import { WithInstance } from '../../../types/projects';

import { componentClassListStatement } from './body/componentClassListStatement';
import { componentRenderStatement } from './body/componentRenderStatement';

export const factory = ts.factory;

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
    component: WithInstance<ComponentResource>,
): JsxAttributeLike[] => {
    for (const key in component.resource.props) {
        console.log(key);
    }
    for (const key in component.instance.props) {
        console.log(key);
    }

    const classListProp = expressionCallProp('classList');

    return [classListProp];
};

export const exportComponent = (component: WithInstance<ComponentResource>): ts.Statement => {
    const { instance } = component;
    const name = instance.name || '';
    const parentProps = getPropsForRenderedComponent(component);
    const renderStatement = componentRenderStatement(
        instance as ComponentGeneratedResource,
        parentProps,
    );
    const classListStatement = componentClassListStatement(instance as ComponentGeneratedResource);
    const statements: ts.Statement[] = [classListStatement, renderStatement];
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

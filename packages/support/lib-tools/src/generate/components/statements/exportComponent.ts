import { ComponentGeneratedResource, ComponentResource } from '@noodles-ui/core-types';
import ts from 'typescript';

import { renderedComponentAlias } from './util/renderedComponentAlias';

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

export const componentRenderStatement = (instance: ComponentGeneratedResource): ts.Statement => {
    const alias = renderedComponentAlias(instance.render);
    return factory.createReturnStatement(
        factory.createJsxSelfClosingElement(
            factory.createIdentifier(alias),
            undefined,
            factory.createJsxAttributes([
                factory.createJsxSpreadAttribute(factory.createIdentifier('props')),
            ]),
        ),
    );
};

export const exportComponent = (instance: ComponentResource): ts.Statement => {
    const name = instance.name || '';
    const renderStatement = componentRenderStatement(instance as ComponentGeneratedResource);
    const statements: ts.Statement[] = [renderStatement];
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

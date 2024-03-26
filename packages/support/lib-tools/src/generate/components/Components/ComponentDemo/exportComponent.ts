import { ComponentOwnResource } from '@noodles-ui/core-types';
import { ComponentBuildContext } from '@noodles-ui/support-types';
import ts from 'typescript';

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

const actualPropsStatement = (): ts.Statement => {
    return factory.createVariableStatement(
        undefined,
        factory.createVariableDeclarationList(
            [
                factory.createVariableDeclaration(
                    factory.createIdentifier('actualProps'),
                    undefined,
                    undefined,
                    factory.createCallExpression(
                        factory.createPropertyAccessExpression(
                            factory.createIdentifier('Object'),
                            factory.createIdentifier('assign'),
                        ),
                        undefined,
                        [
                            factory.createObjectLiteralExpression([], false),
                            factory.createIdentifier('defaultProps'),
                            factory.createIdentifier('props'),
                        ],
                    ),
                ),
            ],
            ts.NodeFlags.Const,
        ),
    );
};

const renderStatement = (component: ComponentBuildContext): ts.Statement => {
    const entity = component.entity as ComponentOwnResource;
    const { name } = entity;

    return factory.createReturnStatement(
        factory.createJsxSelfClosingElement(
            factory.createIdentifier(name),
            undefined,
            factory.createJsxAttributes([
                factory.createJsxSpreadAttribute(factory.createIdentifier('actualProps')),
            ]),
        ),
    );
};

export const exportComponent = (component: ComponentBuildContext): ts.Statement => {
    const entity = component.entity as ComponentOwnResource;
    const { name } = entity;

    const statements: ts.Statement[] = [actualPropsStatement(), renderStatement(component)];
    const componentDeclaration = factory.createVariableDeclaration(
        factory.createIdentifier('Demo' + name),
        undefined,
        factory.createTypeReferenceNode(factory.createIdentifier('Component'), [
            factory.createTypeReferenceNode(factory.createIdentifier('DemoProps'), undefined),
        ]),
        componentArrowFunction(statements),
    );

    return factory.createVariableStatement(
        [factory.createToken(ts.SyntaxKind.ExportKeyword)],
        factory.createVariableDeclarationList([componentDeclaration], ts.NodeFlags.Const),
    );
};

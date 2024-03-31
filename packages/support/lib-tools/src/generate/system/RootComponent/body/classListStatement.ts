import ts from 'typescript';

const factory = ts.factory;

export const classListStatement = (): ts.Statement => {
    const objectLiteral = factory.createObjectLiteralExpression(
        [
            factory.createPropertyAssignment(
                factory.createComputedPropertyName(
                    factory.createPropertyAccessExpression(
                        factory.createIdentifier('styles'),
                        factory.createIdentifier('Root'),
                    ),
                ),
                factory.createTrue(),
            ),
        ],
        true,
    );
    return factory.createVariableStatement(
        undefined,
        factory.createVariableDeclarationList(
            [
                factory.createVariableDeclaration(
                    factory.createIdentifier('classList'),
                    undefined,
                    undefined,
                    factory.createArrowFunction(
                        undefined,
                        undefined,
                        [],
                        undefined,
                        factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
                        factory.createParenthesizedExpression(objectLiteral),
                    ),
                ),
            ],
            ts.NodeFlags.Const,
        ),
    );
};

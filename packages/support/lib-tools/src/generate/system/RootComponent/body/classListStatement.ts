import ts from 'typescript';

const factory = ts.factory;

export const classListStatement = (): ts.Statement => {
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
                        factory.createCallExpression(
                            factory.createIdentifier('surfaceClassList'),
                            undefined,
                            [],
                        ),
                    ),
                ),
            ],
            ts.NodeFlags.Const,
        ),
    );
};

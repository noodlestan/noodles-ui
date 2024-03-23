import ts from 'typescript';

const factory = ts.factory;

const componentArrowFunction = (): ts.Expression => {
    return factory.createArrowFunction(
        undefined,
        undefined,
        [],
        undefined,
        factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
        factory.createJsxFragment(
            factory.createJsxOpeningFragment(),
            [],
            factory.createJsxJsxClosingFragment(),
        ),
    );
};

// const component: Component = () => <></>;

export const declareComponent = (): ts.Statement => {
    const arrowFunction = componentArrowFunction();
    return factory.createVariableStatement(
        undefined,
        factory.createVariableDeclarationList(
            [
                factory.createVariableDeclaration(
                    factory.createIdentifier('component'),
                    undefined,
                    factory.createTypeReferenceNode(
                        factory.createIdentifier('Component'),
                        undefined,
                    ),
                    arrowFunction,
                ),
            ],
            ts.NodeFlags.Const,
        ),
    );
};

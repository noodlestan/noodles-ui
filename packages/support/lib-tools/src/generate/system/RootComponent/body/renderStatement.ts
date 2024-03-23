import ts from 'typescript';

const factory = ts.factory;

export const renderStatement = (): ts.Statement => {
    // TODO allow configuring defaultSurface at project level
    const defaultSurface = 'stage';

    const colourScheme = factory.createJsxAttribute(
        factory.createIdentifier('colourScheme'),
        factory.createJsxExpression(
            undefined,
            factory.createPropertyAccessExpression(
                factory.createIdentifier('props'),
                factory.createIdentifier('colourScheme'),
            ),
        ),
    );
    const theme = factory.createJsxAttribute(
        factory.createIdentifier('theme'),
        factory.createJsxExpression(
            undefined,
            factory.createPropertyAccessExpression(
                factory.createIdentifier('props'),
                factory.createIdentifier('theme'),
            ),
        ),
    );
    const surface = factory.createJsxAttribute(
        factory.createIdentifier('surface'),
        factory.createStringLiteral(defaultSurface),
    );
    const classList = factory.createJsxAttribute(
        factory.createIdentifier('classList'),
        factory.createJsxExpression(undefined, factory.createIdentifier('classList')),
    );
    const attributes = [colourScheme, theme, surface, classList];

    const children = factory.createJsxExpression(
        undefined,
        factory.createPropertyAccessExpression(
            factory.createIdentifier('props'),
            factory.createIdentifier('children'),
        ),
    );

    return factory.createReturnStatement(
        factory.createParenthesizedExpression(
            factory.createJsxElement(
                factory.createJsxOpeningElement(
                    factory.createIdentifier('RootProvider'),
                    undefined,
                    factory.createJsxAttributes(attributes),
                ),
                [children],
                factory.createJsxClosingElement(factory.createIdentifier('RootProvider')),
            ),
        ),
    );
};

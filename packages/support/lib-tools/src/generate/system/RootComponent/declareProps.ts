import ts from 'typescript';

const factory = ts.factory;

export const declareProps = (): ts.TypeAliasDeclaration => {
    return factory.createTypeAliasDeclaration(
        undefined,
        factory.createIdentifier('Props'),
        undefined,
        factory.createTypeLiteralNode([
            factory.createPropertySignature(
                undefined,
                factory.createIdentifier('colourScheme'),
                undefined,
                factory.createTypeReferenceNode(
                    factory.createIdentifier('ColourSchemeName'),
                    undefined,
                ),
            ),
            factory.createPropertySignature(
                undefined,
                factory.createIdentifier('theme'),
                undefined,
                factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
            ),
            factory.createPropertySignature(
                undefined,
                factory.createIdentifier('children'),
                factory.createToken(ts.SyntaxKind.QuestionToken),
                factory.createTypeReferenceNode(
                    factory.createQualifiedName(
                        factory.createIdentifier('JSX'),
                        factory.createIdentifier('Element'),
                    ),
                    undefined,
                ),
            ),
        ]),
    );
};

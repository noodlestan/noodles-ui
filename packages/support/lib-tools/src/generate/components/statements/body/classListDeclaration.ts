import ts from 'typescript';

import { factory } from '../exportComponent';

export const classListDeclaration = (
    objectLiteral: ts.ObjectLiteralExpression,
): ts.VariableDeclarationList => {
    return factory.createVariableDeclarationList(
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
    );
};

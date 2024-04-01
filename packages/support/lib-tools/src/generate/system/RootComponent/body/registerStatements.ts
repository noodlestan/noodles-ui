import ts from 'typescript';

import { capitalize } from '../../../../util/capitalize';

const factory = ts.factory;

const registerStatement = (name: string): ts.Statement => {
    const variableName = name + 's';
    const registerFunction = 'register' + capitalize(name);
    return factory.createExpressionStatement(
        factory.createCallExpression(
            factory.createPropertyAccessExpression(
                factory.createIdentifier(variableName),
                factory.createIdentifier('forEach'),
            ),
            undefined,
            [factory.createIdentifier(registerFunction)],
        ),
    );
};

export const registerStatements = (): ts.Statement[] => {
    return [registerStatement('surface'), registerStatement('theme')];
};

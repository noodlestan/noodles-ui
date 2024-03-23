import ts from 'typescript';

import { factory } from './exportTheme';

export const createPropertyAssignment = (
    name: string,
    initializer: ts.Expression,
): ts.PropertyAssignment => {
    return factory.createPropertyAssignment(factory.createIdentifier(name), initializer);
};

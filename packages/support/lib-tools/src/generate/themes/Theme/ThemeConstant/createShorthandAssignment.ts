import ts from 'typescript';

import { factory } from './exportTheme';

export const createShorthandAssignment = (name: string): ts.ShorthandPropertyAssignment => {
    return factory.createShorthandPropertyAssignment(factory.createIdentifier(name), undefined);
};

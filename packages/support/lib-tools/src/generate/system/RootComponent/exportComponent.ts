import ts from 'typescript';

import { classListStatement } from './body/classListStatement';
import { registerStatements } from './body/registerStatements';
import { renderStatement } from './body/renderStatement';
import { storeStatements } from './body/storeStatements';

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

export const exportComponent = (): ts.Statement => {
    const stores = storeStatements();
    const registers = registerStatements();
    const classList = classListStatement();
    const render = renderStatement();

    // TODO const name = systemComponentName(project);
    const name = 'UIRoot';

    const statements: ts.Statement[] = [...stores, ...registers, classList, render];
    const componentDeclaration = factory.createVariableDeclaration(
        factory.createIdentifier(name),
        undefined,
        factory.createTypeReferenceNode(factory.createIdentifier('Component'), [
            factory.createTypeReferenceNode(factory.createIdentifier('Props'), undefined),
        ]),
        componentArrowFunction(statements),
    );

    return factory.createVariableStatement(
        [factory.createToken(ts.SyntaxKind.ExportKeyword)],
        factory.createVariableDeclarationList([componentDeclaration], ts.NodeFlags.Const),
    );
};

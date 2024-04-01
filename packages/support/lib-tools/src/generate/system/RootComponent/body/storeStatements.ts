import ts from 'typescript';

import { capitalize } from '../../../../util/capitalize';

const factory = ts.factory;

const storeStatement = (name: string): ts.Statement => {
    const entityName = name + 'sStore';
    const registerFunction = 'register' + capitalize(name);
    return factory.createVariableStatement(
        undefined,
        factory.createVariableDeclarationList(
            [
                factory.createVariableDeclaration(
                    factory.createObjectBindingPattern([
                        factory.createBindingElement(
                            undefined,
                            undefined,
                            factory.createIdentifier(registerFunction),
                            undefined,
                        ),
                    ]),
                    undefined,
                    undefined,
                    factory.createIdentifier(entityName),
                ),
            ],
            ts.NodeFlags.Const,
        ),
    );
};

export const storeStatements = (): ts.Statement[] => {
    return [storeStatement('surface'), storeStatement('theme')];
};

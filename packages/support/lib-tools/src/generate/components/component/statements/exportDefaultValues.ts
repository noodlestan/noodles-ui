import { PropInstance } from '@noodles-ui/core-types';
import { ComponentContextWithInstance } from '@noodles-ui/support-types';
import ts from 'typescript';

import { getPropDefaultConstantName } from './props/getPropDefaultConstantName';
import { getPropsWithDefaultValues } from './props/getPropsWithDefaultValues';
import { isPropVariant } from './props/isPropVariant';

const factory = ts.factory;
const defaultValueStatement = (
    component: ComponentContextWithInstance,
    prop: PropInstance,
): ts.VariableStatement => {
    const { instance } = component;

    const constantName = getPropDefaultConstantName(instance, prop);
    // TODO use TS factory to create the literals instesad of this hack
    const constantValue = JSON.stringify(prop.defaultValue);

    return factory.createVariableStatement(
        [factory.createToken(ts.SyntaxKind.ExportKeyword)],
        factory.createVariableDeclarationList(
            [
                factory.createVariableDeclaration(
                    factory.createIdentifier(constantName),
                    undefined,
                    undefined,
                    factory.createCallExpression(
                        factory.createPropertyAccessExpression(
                            factory.createIdentifier('JSON'),
                            factory.createIdentifier('parse'),
                        ),
                        undefined,
                        [factory.createStringLiteral(constantValue)],
                    ),
                ),
            ],
            ts.NodeFlags.Const,
        ),
    );
};

export const exportDefaultValues = (component: ComponentContextWithInstance): ts.Statement[] => {
    const { instance } = component;
    const propsWithDefaultValuesExcludingVariants = getPropsWithDefaultValues(instance).filter(
        prop => !isPropVariant(prop),
    );
    return propsWithDefaultValuesExcludingVariants.map(prop =>
        defaultValueStatement(component, prop),
    );
};

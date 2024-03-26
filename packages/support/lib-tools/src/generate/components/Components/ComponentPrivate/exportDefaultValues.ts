import { PropEntity } from '@noodles-ui/core-types';
import { ComponentBuildContext } from '@noodles-ui/support-types';
import ts from 'typescript';

import { getPropDefaultConstantName } from '../../../../entities/component/prop/getters/getPropDefaultConstantName';
import { getPropsWithDefaultValues } from '../../../../entities/component/prop/getters/getPropsWithDefaultValues';
import { isPropVariant } from '../../../../entities/component/prop/getters/isPropVariant';

const factory = ts.factory;
const defaultValueStatement = (
    component: ComponentBuildContext,
    prop: PropEntity,
): ts.VariableStatement => {
    const { entity } = component;

    const constantName = getPropDefaultConstantName(entity, prop);
    // TODO use TS factory to create the literals instead of this hack
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

export const exportDefaultValues = (component: ComponentBuildContext): ts.Statement[] => {
    const { entity } = component;
    const propsWithDefaultValuesExcludingVariants = getPropsWithDefaultValues(entity).filter(
        prop => !isPropVariant(prop),
    );
    return propsWithDefaultValuesExcludingVariants.map(prop =>
        defaultValueStatement(component, prop),
    );
};

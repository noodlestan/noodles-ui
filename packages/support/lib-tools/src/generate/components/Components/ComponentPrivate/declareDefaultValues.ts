import {
    ComponentBuildContext,
    PropEntity,
    getPropDefaultConstantName,
    getPropsWithDefaultValues,
    isPropVariant,
} from '@noodles-ui/core-entities';
import ts from 'typescript';

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

export const declareDefaultValues = (component: ComponentBuildContext): ts.Statement[] => {
    const { entity } = component;
    const propsWithDefaultValuesExcludingVariants = getPropsWithDefaultValues(entity).filter(
        prop => !isPropVariant(prop),
    );
    return propsWithDefaultValuesExcludingVariants.map(prop =>
        defaultValueStatement(component, prop),
    );
};

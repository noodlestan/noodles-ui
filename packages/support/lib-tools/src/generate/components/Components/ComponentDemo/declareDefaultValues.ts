import { ComponentEntity, PropEntity, Value } from '@noodles-ui/core-types';
import { ComponentBuildContext } from '@noodles-ui/support-types';
import ts from 'typescript';

import { hasPropDefaultValue } from '../../../../entities/component/prop/getters/hasPropDefaultValue';

const factory = ts.factory;

export const getPropsDefaults = (
    entity: ComponentEntity,
): { prop: PropEntity; defaultValue: Value }[] =>
    Object.values(entity.props)
        .filter(prop => prop.name === 'children' || hasPropDefaultValue(prop))
        .map(prop => {
            if (prop.name === 'children') {
                return { prop, defaultValue: 'Lorem Ipsum' };
            }
            return { prop, defaultValue: prop.defaultValue };
        });

export const declareDefaultValues = (component: ComponentBuildContext): ts.Statement => {
    const entity = component.entity;
    const { name } = entity;

    const propsProperties = getPropsDefaults(entity).map(({ prop, defaultValue }) =>
        factory.createPropertyAssignment(
            factory.createIdentifier(prop.name),
            factory.createStringLiteral(`${defaultValue}`),
        ),
    );

    return factory.createVariableStatement(
        undefined,
        factory.createVariableDeclarationList(
            [
                factory.createVariableDeclaration(
                    factory.createIdentifier('defaultProps'),
                    undefined,
                    factory.createTypeReferenceNode(
                        factory.createIdentifier(name + 'Props'),
                        undefined,
                    ),
                    factory.createObjectLiteralExpression(propsProperties, true),
                ),
            ],
            ts.NodeFlags.Const,
        ),
    );
};

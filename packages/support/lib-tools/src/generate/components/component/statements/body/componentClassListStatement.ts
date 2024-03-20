import { ComponentEntity, PropEntity } from '@noodles-ui/core-types';
import ts, { PropertyName } from 'typescript';

import { getVariantPropsWithMixin } from '../../../../../entities/component/prop/getters/getVariantPropsWithMixin';
import { hasPropDefaultValue } from '../../../../../entities/component/prop/getters/hasPropDefaultValue';

const factory = ts.factory;

const classListDeclaration = (
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

const classListItem = (property: PropertyName) =>
    factory.createPropertyAssignment(property, factory.createTrue());

const componentClassName = (name: string): PropertyName =>
    factory.createComputedPropertyName(
        factory.createPropertyAccessExpression(
            factory.createIdentifier('styles'),
            factory.createIdentifier(name),
        ),
    );

const componentVariantClassName = (entity: ComponentEntity, prop: PropEntity): PropertyName => {
    const prefix = `${entity.name}-${prop.name}-`;
    const propName = prop.name;

    const expression = hasPropDefaultValue(prop)
        ? factory.createCallExpression(factory.createIdentifier(propName), undefined, [])
        : factory.createPropertyAccessExpression(
              factory.createIdentifier('props'),
              factory.createIdentifier(propName),
          );

    return factory.createComputedPropertyName(
        factory.createElementAccessExpression(
            factory.createIdentifier('styles'),
            factory.createTemplateExpression(factory.createTemplateHead(prefix, prefix), [
                factory.createTemplateSpan(expression, factory.createTemplateTail('', '')),
            ]),
        ),
    );
};

export const componentClassListStatement = (entity: ComponentEntity): ts.Statement => {
    const name = entity.name || '';
    const variantClassListItems = getVariantPropsWithMixin(entity).map(prop =>
        classListItem(componentVariantClassName(entity, prop)),
    );
    const objectLiteral = factory.createObjectLiteralExpression(
        [classListItem(componentClassName(name)), ...variantClassListItems],
        true,
    );

    const variableDeclarationList = classListDeclaration(objectLiteral);
    return factory.createVariableStatement(undefined, variableDeclarationList);
};

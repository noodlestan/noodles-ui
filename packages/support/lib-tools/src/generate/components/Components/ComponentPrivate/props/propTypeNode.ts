import { PropEntity } from '@noodles-ui/core-types';
import { ComponentBuildContext, ProjectContext } from '@noodles-ui/support-types';
import ts from 'typescript';

import { isPropVariantEntity } from '../../../../../entities/component/prop/getters/isPropVariantEntity';
import { isPropVariantReference } from '../../../../../entities/component/prop/getters/isPropVariantReference';

const factory = ts.factory;

export const propTypeNode = (
    project: ProjectContext,
    component: ComponentBuildContext,
    prop: PropEntity,
): ts.TypeNode | undefined => {
    const { entity } = component;

    if (prop.name === 'children') {
        return factory.createTypeReferenceNode(
            factory.createQualifiedName(
                factory.createIdentifier('JSX'),
                factory.createIdentifier('Element'),
            ),
            undefined,
        );
    }
    const propVariant = isPropVariantEntity(prop);
    if (propVariant) {
        if (!propVariant.variant.name) {
            project.addError(entity, `Unnamed variant at prop ${prop.name}.`);
            return;
        }
        return factory.createTypeReferenceNode(
            factory.createIdentifier(propVariant.variant.name),
            undefined,
        );
    }

    const propReference = isPropVariantReference(prop);
    if (propReference) {
        if (!propReference.reference.name) {
            project.addError(entity, `Unnamed variant at prop ${prop.name}.`);
            return;
        }
        return factory.createTypeReferenceNode(
            factory.createIdentifier(propReference.reference.name),
            undefined,
        );
    }
    return factory.createLiteralTypeNode(factory.createStringLiteral('string'));
};

import { PropInstance } from '@noodles-ui/core-types';
import ts from 'typescript';

import { ComponentContextWithInstance, ProjectContext } from '../../../../types/projects';

import { isPropVariantInstance } from './isPropVariantInstance';
import { isPropVariantReference } from './isPropVariantReference';

const factory = ts.factory;

export const getPropTypeNode = (
    project: ProjectContext,
    component: ComponentContextWithInstance,
    prop: PropInstance,
): ts.TypeNode | undefined => {
    if (prop.name === 'children') {
        return factory.createTypeReferenceNode(
            factory.createQualifiedName(
                factory.createIdentifier('JSX'),
                factory.createIdentifier('Element'),
            ),
            undefined,
        );
    }
    const propVariant = isPropVariantInstance(prop);
    if (propVariant) {
        if (!propVariant.variant.name) {
            project.addDiagnostic(component.instance, `Unnamed variant at prop ${prop.name}.`);
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
            project.addDiagnostic(component.instance, `Unnamed variant at prop ${prop.name}.`);
            return;
        }
        return factory.createTypeReferenceNode(
            factory.createIdentifier(propReference.reference.name),
            undefined,
        );
    }
    return factory.createLiteralTypeNode(factory.createStringLiteral('string'));
};

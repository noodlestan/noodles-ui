import { CompilerContext } from '@noodles-ui/core-compiler';
import {
    ComponentBuildContext,
    PropEntity,
    isPropVariantEntity,
    isPropVariantReference,
} from '@noodles-ui/core-entities';
import ts from 'typescript';

const factory = ts.factory;

export const propTypeNode = (
    compiler: CompilerContext,
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
            compiler.addError(entity, `Unnamed variant at prop ${prop.name}.`);
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
            compiler.addError(entity, `Unnamed variant at prop ${prop.name}.`);
            return;
        }
        return factory.createTypeReferenceNode(
            factory.createIdentifier(propReference.reference.name),
            undefined,
        );
    }
    return factory.createLiteralTypeNode(factory.createStringLiteral('string'));
};

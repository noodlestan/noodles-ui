import { ComponentResource, LocalPropResource } from '@noodles-ui/core-types';
import ts from 'typescript';

import { isPropVariant } from '../../../../project/components/props/isVariantProp';
import { ProjectContext, WithInstance } from '../../../../types/projects';

export const factory = ts.factory;

export const getPropTypeNode = (
    project: ProjectContext,
    component: WithInstance<ComponentResource>,
    name: string,
    prop: LocalPropResource,
): ts.TypeNode | undefined => {
    if (name === 'children') {
        return factory.createTypeReferenceNode(
            factory.createQualifiedName(
                factory.createIdentifier('JSX'),
                factory.createIdentifier('Element'),
            ),
            undefined,
        );
    }
    const variant = isPropVariant(prop);
    if (variant) {
        if (!variant.name) {
            project.addDiagnostic(component.instance, `Unnamed variant at prop ${name}.`);
            return;
        }
        return factory.createTypeReferenceNode(factory.createIdentifier(variant.name), undefined);
    }
    return factory.createLiteralTypeNode(factory.createStringLiteral('string'));
};

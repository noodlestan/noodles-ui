import { ComponentBuildContext, ProjectContext } from '@noodles-ui/support-types';
import ts from 'typescript';

import { propTypeNode } from './propTypeNode';

const factory = ts.factory;

export const componentPropsSignatures = (
    project: ProjectContext,
    component: ComponentBuildContext,
): ts.PropertySignature[] => {
    const { entity } = component;
    return Object.values(entity.props)
        .map(prop => {
            const typeNode = propTypeNode(project, component, prop);
            return { typeNode, propName: prop.name };
        })
        .filter(({ typeNode }) => !!typeNode)
        .map(({ typeNode, propName }) => {
            return factory.createPropertySignature(
                undefined,
                factory.createIdentifier(propName),
                undefined,
                typeNode,
            );
        });
};

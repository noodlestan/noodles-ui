import { ComponentBuildContext, ProjectContext } from '@noodles-ui/support-types';
import ts from 'typescript';

import { getPropTypeNode } from './getPropTypeNode';

const factory = ts.factory;

export const getComponentPropsSignatures = (
    project: ProjectContext,
    component: ComponentBuildContext,
): ts.PropertySignature[] => {
    const { entity } = component;
    return Object.values(entity.props)
        .map(prop => {
            const typeNode = getPropTypeNode(project, component, prop);
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

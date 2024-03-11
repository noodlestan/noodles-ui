import ts from 'typescript';

import { ComponentContextWithInstance, ProjectContext } from '../../../../../types/projects';

import { getPropTypeNode } from './getPropTypeNode';

const factory = ts.factory;

export const getComponentPropsSignatures = (
    project: ProjectContext,
    component: ComponentContextWithInstance,
): ts.PropertySignature[] => {
    const { instance } = component;
    return Object.values(instance.props)
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

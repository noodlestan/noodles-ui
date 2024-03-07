import { ComponentResource } from '@noodles-ui/core-types';
import ts from 'typescript';

import { ProjectContext, WithInstance } from '../../../../types/projects';

import { getPropTypeNode } from './getPropTypeNode';

export const factory = ts.factory;

export const getComponentProps = (
    project: ProjectContext,
    component: WithInstance<ComponentResource>,
): ts.PropertySignature[] => {
    const { instance } = component;
    return Object.entries(instance.props || {})
        .map(([name, prop]) => {
            const type = getPropTypeNode(project, component, name, prop);
            return { type, name };
        })
        .filter(({ type }) => !!type)
        .map(({ type, name }) => {
            return factory.createPropertySignature(
                undefined,
                factory.createIdentifier(name),
                undefined,
                type,
            );
        });
};

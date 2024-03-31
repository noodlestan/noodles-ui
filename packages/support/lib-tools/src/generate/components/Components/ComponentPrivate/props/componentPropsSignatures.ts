import { CompilerContext } from '@noodles-ui/core-compiler';
import { ComponentBuildContext } from '@noodles-ui/core-entities';
import ts from 'typescript';

import { propTypeNode } from './propTypeNode';

const factory = ts.factory;

export const componentPropsSignatures = (
    compiler: CompilerContext,
    component: ComponentBuildContext,
): ts.PropertySignature[] => {
    const { entity } = component;
    return Object.values(entity.props)
        .map(prop => {
            const typeNode = propTypeNode(compiler, component, prop);
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

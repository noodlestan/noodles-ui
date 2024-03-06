import { ComponentResource, RenderedComponentResource } from '@noodles-ui/core-types';
import ts from 'typescript';

import { WithInstance } from '../../../types/projects';

import { getComponentProps } from './props/getComponentProps';
import { renderedComponentAlias } from './util/renderedComponentAlias';

export const factory = ts.factory;

export const exportComponentProps = (
    component: WithInstance<ComponentResource>,
): ts.TypeAliasDeclaration => {
    const { instance } = component;
    const rendered = instance.render as RenderedComponentResource;
    const name = instance.name || '';
    const alias = renderedComponentAlias(rendered);
    const extendedPropsType = alias + 'Props';

    const props = getComponentProps(component);
    return factory.createTypeAliasDeclaration(
        [factory.createToken(ts.SyntaxKind.ExportKeyword)],
        factory.createIdentifier(name + 'Props'),
        undefined,
        factory.createIntersectionTypeNode([
            factory.createTypeReferenceNode(factory.createIdentifier(extendedPropsType), undefined),
            factory.createTypeLiteralNode(props),
        ]),
    );
};

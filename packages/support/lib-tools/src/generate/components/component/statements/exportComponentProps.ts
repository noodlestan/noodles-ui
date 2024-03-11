import { ComponentOwnInstance, RenderedComponentResource } from '@noodles-ui/core-types';
import ts from 'typescript';

import { ComponentContextWithInstance, ProjectContext } from '../../../../types/projects';

import { getComponentPropsSignatures } from './props/getComponentPropsSignatures';
import { renderedComponentAlias } from './util/renderedComponentAlias';

const factory = ts.factory;

export const exportComponentProps = (
    project: ProjectContext,
    component: ComponentContextWithInstance,
): ts.TypeAliasDeclaration => {
    const instance = component.instance as ComponentOwnInstance;
    const rendered = instance.render as RenderedComponentResource;

    const name = instance.name || '';
    const alias = renderedComponentAlias(rendered);
    const extendedPropsType = alias + 'Props';
    const inheritedType = factory.createTypeReferenceNode(
        factory.createIdentifier(extendedPropsType),
        undefined,
    );

    const props = getComponentPropsSignatures(project, component);
    const typeDef = props.length
        ? factory.createIntersectionTypeNode([inheritedType, factory.createTypeLiteralNode(props)])
        : inheritedType;

    return factory.createTypeAliasDeclaration(
        [factory.createToken(ts.SyntaxKind.ExportKeyword)],
        factory.createIdentifier(name + 'Props'),
        undefined,
        typeDef,
    );
};

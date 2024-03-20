import { ComponentOwnEntity } from '@noodles-ui/core-types';
import { ComponentBuildContext, ProjectContext } from '@noodles-ui/support-types';
import ts from 'typescript';

import { NUI_RENDERED_PROPS_NAME } from '../../../constants';

import { componentPropsSignatures } from './props/componentPropsSignatures';

const factory = ts.factory;

export const exportComponentProps = (
    project: ProjectContext,
    component: ComponentBuildContext,
): ts.TypeAliasDeclaration => {
    const entity = component.entity as ComponentOwnEntity;

    const name = entity.name || '';
    const inheritedType = factory.createTypeReferenceNode(
        factory.createIdentifier(NUI_RENDERED_PROPS_NAME),
        undefined,
    );

    const props = componentPropsSignatures(project, component);
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

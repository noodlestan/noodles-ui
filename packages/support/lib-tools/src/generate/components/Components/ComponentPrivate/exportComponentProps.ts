import { CompilerContext } from '@noodles-ui/core-compiler';
import { ComponentBuildContext, ComponentRenderEntity } from '@noodles-ui/core-entities';
import ts from 'typescript';

import { NUI_RENDERED_PROPS_NAME } from '../../../constants';

import { componentPropsSignatures } from './props/componentPropsSignatures';

const factory = ts.factory;

export const exportComponentProps = (
    compiler: CompilerContext,
    component: ComponentBuildContext,
): ts.TypeAliasDeclaration => {
    const entity = component.entity as ComponentRenderEntity;

    const name = entity.name || '';
    const inheritedType = factory.createTypeReferenceNode(
        factory.createIdentifier(NUI_RENDERED_PROPS_NAME),
        undefined,
    );

    const props = componentPropsSignatures(compiler, component);
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

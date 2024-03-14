import { ComponentOwnInstance } from '@noodles-ui/core-types';
import { ComponentContextWithInstance, ProjectContext } from '@noodles-ui/support-types';
import ts from 'typescript';

import { NUI_RENDERED_PROPS_NAME } from '../../../constants';

import { getComponentPropsSignatures } from './props/getComponentPropsSignatures';

const factory = ts.factory;

export const exportComponentProps = (
    project: ProjectContext,
    component: ComponentContextWithInstance,
): ts.TypeAliasDeclaration => {
    const instance = component.instance as ComponentOwnInstance;

    const name = instance.name || '';
    const inheritedType = factory.createTypeReferenceNode(
        factory.createIdentifier(NUI_RENDERED_PROPS_NAME),
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

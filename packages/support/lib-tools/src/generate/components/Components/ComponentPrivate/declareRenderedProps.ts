import { ComponentOwnEntity, RenderedComponentResource } from '@noodles-ui/core-types';
import { CompilerContext, ComponentBuildContext } from '@noodles-ui/support-types';
import ts from 'typescript';

import { NUI_RENDERED_PROPS_NAME } from '../../../constants';

import { renderedComponentAlias } from './util/renderedComponentAlias';

const factory = ts.factory;

const propNameList = (names: string[]): ts.TypeNode =>
    factory.createUnionTypeNode(
        names.map(propName => factory.createLiteralTypeNode(factory.createStringLiteral(propName))),
    );

const omitProps = (fromType: string, names: string[]) =>
    factory.createTypeReferenceNode(factory.createIdentifier('Omit'), [
        factory.createTypeReferenceNode(factory.createIdentifier(fromType), undefined),
        propNameList(names),
    ]);

const pickProps = (fromType: string, names: string[]) =>
    factory.createTypeReferenceNode(factory.createIdentifier('Pick'), [
        factory.createTypeReferenceNode(factory.createIdentifier(fromType), undefined),
        propNameList(names),
    ]);

export const declareRenderedProps = (
    compiler: CompilerContext,
    component: ComponentBuildContext,
): ts.TypeAliasDeclaration => {
    const { resource } = component.context;
    const entity = component.entity as ComponentOwnEntity;
    const rendered = entity.render as RenderedComponentResource;

    const alias = renderedComponentAlias(rendered);
    const extendedPropsType = alias + 'Props';

    const isOmit = !!resource.hides;
    const isPick = !!resource.exposes && resource.exposes !== '*';
    // const isAll = resource.exposes === '*';
    // const isAll = !isPick && !isOmit;

    const typeDef = isOmit
        ? omitProps(extendedPropsType, Object.keys(resource.hides || {}))
        : isPick
          ? pickProps(extendedPropsType, Object.keys(resource.hides || {}))
          : factory.createTypeReferenceNode(factory.createIdentifier(extendedPropsType), undefined);

    return factory.createTypeAliasDeclaration(
        undefined,
        factory.createIdentifier(NUI_RENDERED_PROPS_NAME),
        undefined,
        typeDef,
    );
};

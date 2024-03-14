import { ComponentOwnInstance, RenderedComponentResource } from '@noodles-ui/core-types';
import { ComponentContextWithInstance, ProjectContext } from '@noodles-ui/support-types';
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
    project: ProjectContext,
    component: ComponentContextWithInstance,
): ts.TypeAliasDeclaration => {
    const instance = component.instance as ComponentOwnInstance;
    const rendered = instance.render as RenderedComponentResource;

    const alias = renderedComponentAlias(rendered);
    const extendedPropsType = alias + 'Props';

    const isOmit = !!component.resource.hides;
    const isPick = !!component.resource.exposes && component.resource.exposes !== '*';
    // const isAll = component.resource.exposes === '*';
    // const isAll = !isPick && !isOmit;

    const typeDef = isOmit
        ? omitProps(extendedPropsType, Object.keys(component.resource.hides || {}))
        : isPick
          ? pickProps(extendedPropsType, Object.keys(component.resource.hides || {}))
          : factory.createTypeReferenceNode(factory.createIdentifier(extendedPropsType), undefined);

    return factory.createTypeAliasDeclaration(
        undefined,
        factory.createIdentifier(NUI_RENDERED_PROPS_NAME),
        undefined,
        typeDef,
    );
};

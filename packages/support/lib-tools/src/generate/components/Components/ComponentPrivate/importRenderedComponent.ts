import { ComponentBuildContext } from '@noodles-ui/core-entities';
import { ComponentRenderResource, RenderedComponentResource } from '@noodles-ui/core-resources';
import ts from 'typescript';

import { renderedComponentAlias } from './util/renderedComponentAlias';

const factory = ts.factory;

export const importRenderedComponent = (component: ComponentBuildContext): ts.Statement => {
    const entity = component.entity as ComponentRenderResource;
    const rendered = entity.render as RenderedComponentResource;
    const { name = '', from } = rendered;
    const alias = renderedComponentAlias(rendered);
    return factory.createImportDeclaration(
        undefined,
        factory.createImportClause(
            false,
            undefined,
            factory.createNamedImports([
                factory.createImportSpecifier(
                    false,
                    factory.createIdentifier(name),
                    factory.createIdentifier(alias),
                ),
                factory.createImportSpecifier(
                    true,
                    factory.createIdentifier(name + 'Props'),
                    factory.createIdentifier(alias + 'Props'),
                ),
            ]),
        ),
        factory.createStringLiteral(from.module),
        undefined,
    );
};

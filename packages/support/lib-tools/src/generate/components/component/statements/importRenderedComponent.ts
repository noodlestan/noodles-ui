import { ComponentOwnResource, RenderedComponentResource } from '@noodles-ui/core-types';
import { ComponentContextWithInstance } from '@noodles-ui/support-types';
import ts from 'typescript';

import { renderedComponentAlias } from './util/renderedComponentAlias';

const factory = ts.factory;

export const importRenderedComponent = (component: ComponentContextWithInstance): ts.Statement => {
    const instance = component.instance as ComponentOwnResource;
    const rendered = instance.render as RenderedComponentResource;
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

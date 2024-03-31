import { ComponentBuildContext } from '@noodles-ui/core-entities';
import ts from 'typescript';

const factory = ts.factory;

export const declareDemoProps = (component: ComponentBuildContext): ts.Statement => {
    const entity = component.entity;
    const { name } = entity;

    return factory.createTypeAliasDeclaration(
        undefined,
        factory.createIdentifier('DemoProps'),
        undefined,
        factory.createIntersectionTypeNode([
            factory.createTypeReferenceNode(factory.createIdentifier(name + 'Props'), undefined),
            factory.createTypeLiteralNode([
                factory.createPropertySignature(
                    undefined,
                    factory.createIdentifier('children'),
                    undefined,
                    factory.createTypeReferenceNode(
                        factory.createQualifiedName(
                            factory.createIdentifier('JSX'),
                            factory.createIdentifier('Element'),
                        ),
                        undefined,
                    ),
                ),
            ]),
        ]),
    );
};

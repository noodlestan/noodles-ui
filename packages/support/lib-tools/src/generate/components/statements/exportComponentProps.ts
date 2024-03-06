import { ComponentResource } from '@noodles-ui/core-types';
import ts from 'typescript';

const factory = ts.factory;

export const exportComponentProps = (instance: ComponentResource): ts.TypeAliasDeclaration => {
    const name = instance.name || '';
    return factory.createTypeAliasDeclaration(
        [factory.createToken(ts.SyntaxKind.ExportKeyword)],
        factory.createIdentifier(name + 'Props'),
        undefined,
        factory.createIntersectionTypeNode([
            factory.createTypeReferenceNode(
                factory.createIdentifier('UnstyledTextProps'),
                undefined,
            ),
            factory.createTypeLiteralNode([]),
        ]),
    );
};

import { CompilerContext } from '@noodles-ui/support-types';
import ts from 'typescript';

import { getResourceKey } from '../../../compiler/resources/getters/getResourceKey';
import { getPublicComponents } from '../../../entities/component/getters/getPublicComponents';

const factory = ts.factory;

export const declareLiveMap = (compiler: CompilerContext): ts.VariableStatement => {
    const components = getPublicComponents(compiler);

    const map = components.map(component =>
        factory.createPropertyAssignment(
            factory.createStringLiteral(getResourceKey(component.entity)),
            factory.createIdentifier('Demo' + component.entity.name),
        ),
    );

    return factory.createVariableStatement(
        undefined,
        factory.createVariableDeclarationList(
            [
                factory.createVariableDeclaration(
                    factory.createIdentifier('liveMap'),
                    undefined,
                    factory.createTypeReferenceNode(factory.createIdentifier('Record'), [
                        factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
                        factory.createTypeReferenceNode(factory.createIdentifier('Component'), [
                            factory.createKeywordTypeNode(ts.SyntaxKind.NeverKeyword),
                        ]),
                    ]),
                    factory.createObjectLiteralExpression(map, true),
                ),
            ],
            ts.NodeFlags.Const,
        ),
    );
};

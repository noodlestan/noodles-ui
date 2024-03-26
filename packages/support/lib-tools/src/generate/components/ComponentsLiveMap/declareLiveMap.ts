import { ProjectContext } from '@noodles-ui/support-types';
import ts from 'typescript';

import { getPublicComponents } from '../../../entities/component/getters/getPublicComponents';
import { getResourceKey } from '../../../project/resources/getters/getResourceKey';

const factory = ts.factory;

export const declareLiveMap = (project: ProjectContext): ts.VariableStatement => {
    const components = getPublicComponents(project);

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

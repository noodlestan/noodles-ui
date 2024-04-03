import { CompilerContext } from '@noodles-ui/core-compiler';
import { getPublicComponents, getSystemSurfaceComponent } from '@noodles-ui/core-entities';
import { getResourceKey } from '@noodles-ui/core-resources';
import ts from 'typescript';

const factory = ts.factory;

export const declareLiveMap = (compiler: CompilerContext): ts.VariableStatement => {
    const components = getPublicComponents(compiler);

    const componentItems = components.map(component =>
        factory.createPropertyAssignment(
            factory.createStringLiteral(getResourceKey(component.entity)),
            factory.createIdentifier('Demo' + component.entity.name),
        ),
    );

    const surfaceComponent = getSystemSurfaceComponent(compiler);
    const surfaceItem = surfaceComponent
        ? [
              factory.createPropertyAssignment(
                  factory.createStringLiteral('--surface-component'),
                  factory.createIdentifier(surfaceComponent.entity.name),
              ),
          ]
        : [];

    const map = [...surfaceItem, ...componentItems];

    return factory.createVariableStatement(
        undefined,
        factory.createVariableDeclarationList(
            [
                factory.createVariableDeclaration(
                    factory.createIdentifier('liveMap'),
                    undefined,
                    factory.createTypeReferenceNode(factory.createIdentifier('Record'), [
                        factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
                        factory.createTypeReferenceNode(factory.createIdentifier('unknown')),
                    ]),
                    factory.createObjectLiteralExpression(map, true),
                ),
            ],
            ts.NodeFlags.Const,
        ),
    );
};

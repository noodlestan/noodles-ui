import { ProjectContext, SurfaceBuildContext } from '@noodles-ui/support-types';
import ts from 'typescript';

const factory = ts.factory;

const surfaceStatement = (surface: SurfaceBuildContext): ts.Statement => {
    const { entity } = surface;

    const extendedSurfaces = entity.extend.map(name => factory.createStringLiteral(name));

    const type = factory.createPropertyAssignment(
        factory.createIdentifier('type'),
        factory.createStringLiteral('surface'),
    );
    const name = factory.createPropertyAssignment(
        factory.createIdentifier('name'),
        factory.createStringLiteral(entity.name),
    );
    const module = factory.createPropertyAssignment(
        factory.createIdentifier('module'),
        factory.createStringLiteral(entity.module),
    );
    const extend = factory.createPropertyAssignment(
        factory.createIdentifier('extend'),
        factory.createArrayLiteralExpression(extendedSurfaces, false),
    );

    return factory.createVariableStatement(
        undefined,
        factory.createVariableDeclarationList(
            [
                factory.createVariableDeclaration(
                    factory.createIdentifier(entity.name),
                    undefined,
                    factory.createTypeReferenceNode(
                        factory.createIdentifier('SurfaceResource'),
                        undefined,
                    ),

                    factory.createObjectLiteralExpression([type, name, module, extend], true),
                ),
            ],
            ts.NodeFlags.Const,
        ),
    );
};

export const surfaceStatements = (project: ProjectContext): ts.Statement[] => {
    const surfaces = Array.from(project.entities.surface.values());

    return surfaces.map(surface => surfaceStatement(surface));
};

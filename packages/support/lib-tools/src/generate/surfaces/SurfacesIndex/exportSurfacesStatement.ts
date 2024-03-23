import { ProjectContext } from '@noodles-ui/support-types';
import ts from 'typescript';

const factory = ts.factory;

export const exportSurfacesStatement = (project: ProjectContext): ts.Statement => {
    const surfaces = Array.from(project.entities.surface.values());
    const surfaceNames = surfaces.map(surface => factory.createIdentifier(surface.entity.name));
    return factory.createExportAssignment(
        undefined,
        undefined,
        factory.createArrayLiteralExpression(surfaceNames, false),
    );
};

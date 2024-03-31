import { CompilerContext } from '@noodles-ui/core-compiler';
import ts from 'typescript';

const factory = ts.factory;

export const exportSurfacesStatement = (compiler: CompilerContext): ts.Statement => {
    const surfaces = Array.from(compiler.entities.surface.values());
    const surfaceNames = surfaces.map(surface => factory.createIdentifier(surface.entity.name));
    return factory.createExportAssignment(
        undefined,
        undefined,
        factory.createArrayLiteralExpression(surfaceNames, false),
    );
};

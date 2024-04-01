import { ComponentBuildContext } from '@noodles-ui/core-entities';
import ts from 'typescript';

import { relativePath } from '../../../util/relativePath';
import { componentLiveFileName } from '../paths/componentLiveFileName';
import { componentsLiveMapFileName } from '../paths/componentsLiveMapFileName';

const factory = ts.factory;

export const importComponent = (
    component: ComponentBuildContext,
    targetDir: string,
): ts.Statement => {
    const entity = component.entity;
    const { name } = entity;

    const liveMapFile = componentsLiveMapFileName(targetDir);
    const liveFile = componentLiveFileName(targetDir, component.entity);
    const path = relativePath(liveMapFile, liveFile, true);

    return factory.createImportDeclaration(
        undefined,
        factory.createImportClause(
            false,
            undefined,
            factory.createNamedImports([
                factory.createImportSpecifier(
                    false,
                    undefined,
                    factory.createIdentifier('Demo' + name),
                ),
            ]),
        ),
        factory.createStringLiteral(path),
        undefined,
    );
};

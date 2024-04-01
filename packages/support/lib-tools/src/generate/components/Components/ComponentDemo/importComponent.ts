import { ComponentBuildContext } from '@noodles-ui/core-entities';
import ts from 'typescript';

import { relativePath } from '../../../../util/relativePath';
import { componentFileName } from '../../paths/componentFileName';
import { componentLiveFileName } from '../../paths/componentLiveFileName';

const factory = ts.factory;

export const importComponent = (
    component: ComponentBuildContext,
    targetDir: string,
): ts.Statement => {
    const entity = component.entity;
    const { name } = entity;

    const demoFile = componentLiveFileName(targetDir, component.entity);
    const componentFile = componentFileName(targetDir, component.entity);
    const path = relativePath(demoFile, componentFile, true);

    return factory.createImportDeclaration(
        undefined,
        factory.createImportClause(
            false,
            undefined,
            factory.createNamedImports([
                factory.createImportSpecifier(false, undefined, factory.createIdentifier(name)),
                factory.createImportSpecifier(
                    true,
                    undefined,
                    factory.createIdentifier(name + 'Props'),
                ),
            ]),
        ),
        factory.createStringLiteral(path),
        undefined,
    );
};

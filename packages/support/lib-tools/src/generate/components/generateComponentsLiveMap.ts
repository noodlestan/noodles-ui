import { writeFile } from 'fs/promises';

import { CompilerContext } from '@noodles-ui/core-compiler';
import {
    ComponentBuildContext,
    getPublicComponents,
    getSystemSurfaceComponent,
} from '@noodles-ui/core-entities';
import ts from 'typescript';

import { ensureFileDir } from '../../util/ensureFileDir';
import { relativePath } from '../../util/relativePath';
import { formatTypescriptFile } from '../eslint/formatTypescriptFile';
import { formatSourceCodeWithPrettier } from '../prettier/formatSourceCodeWithPrettier';
import { printTypescriptStatements } from '../typescript/printTypescriptStatements';
import { tsFileHeader } from '../typescript/tsFileHeader';

import { createImportDemoComponent } from './ComponentsLiveMap/createImportDemoComponent';
import { declareLiveMap } from './ComponentsLiveMap/declareLiveMap';
import { componentFileName } from './paths/componentFileName';
import { componentsLiveMapFileName } from './paths/componentsLiveMapFileName';

const factory = ts.factory;

const createImportSurfaceComponent = (
    component: ComponentBuildContext,
    targetDir: string,
): ts.Statement => {
    const entity = component.entity;
    const { name } = entity;

    const liveMapFile = componentsLiveMapFileName(targetDir);
    const liveFile = componentFileName(targetDir, component.entity);
    const path = relativePath(liveMapFile, liveFile, true);

    return factory.createImportDeclaration(
        undefined,
        factory.createImportClause(
            false,
            undefined,
            factory.createNamedImports([
                factory.createImportSpecifier(false, undefined, factory.createIdentifier(name)),
            ]),
        ),
        factory.createStringLiteral(path),
        undefined,
    );
};

export const generateComponentsLiveMap = async (
    compiler: CompilerContext,
    targetDir: string,
): Promise<void> => {
    const fileName = componentsLiveMapFileName(targetDir);
    await ensureFileDir(fileName);

    // const internalTypes: TypesToImport = [['../root', ['UnknownComponent']]];
    // const internalImports = createImportStatements(internalTypes);

    const components = getPublicComponents(compiler);
    const importComponents = components.map(component =>
        createImportDemoComponent(component, targetDir),
    );

    const surfaceComponent = getSystemSurfaceComponent(compiler);
    if (surfaceComponent) {
        importComponents.unshift(createImportSurfaceComponent(surfaceComponent, targetDir));
    }

    const exportDefault = factory.createExportAssignment(
        undefined,
        undefined,
        factory.createIdentifier('liveMap'),
    );

    const statements = [
        // ...internalImports,
        ...importComponents,
        declareLiveMap(compiler),
        exportDefault,
    ];

    const content = await printTypescriptStatements(statements);
    const output = tsFileHeader(compiler, fileName) + content + '\n';
    const formatted = await formatSourceCodeWithPrettier(fileName, output);
    await writeFile(fileName, formatted);
    const success = await formatTypescriptFile(compiler, fileName);

    compiler.addGeneratedSourceFile({ fileName, success });
};

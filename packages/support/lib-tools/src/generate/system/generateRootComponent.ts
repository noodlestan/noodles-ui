import { writeFile } from 'fs/promises';

import { ProjectContext } from '@noodles-ui/support-types';

import { formatTypescriptFile } from '../eslint/formatTypescriptFile';
import { TypesToImport, createImportStatements } from '../internal/createImportStatements';
import { formatSourceCodeWithPrettier } from '../prettier/formatSourceCodeWithPrettier';
import { importFrameworkTypes } from '../targets/solid-js/importFrameworkTypes';
import { printTypescriptStatements } from '../typescript/printTypescriptStatements';
import { tsFileHeader } from '../typescript/tsFileHeader';

import { declareProps } from './RootComponent/declareProps';
import { exportComponent } from './RootComponent/exportComponent';
import { systemRootFileName } from './paths/systemRootFileName';

export const generateRootComponent = async (
    project: ProjectContext,
    targetDir: string,
): Promise<void> => {
    const fileName = systemRootFileName(targetDir);

    const internalTypes: TypesToImport = [
        ['@noodles-ui/core-services', ['RootProvider, surfacesStore, themesStore']],
        ['@noodles-ui/core-styled', ['surfaceClassList']],
        ['@noodles-ui/core-types', ['ColourSchemeName']],
    ];
    const localImports: TypesToImport = [
        ['./surfaces', 'surfaces'],
        ['./themes', 'themes'],
    ];
    const statements = [
        importFrameworkTypes(true),
        ...createImportStatements([...internalTypes, ...localImports]),
        declareProps(),
        exportComponent(),
    ];

    const content = await printTypescriptStatements(statements);
    const output = tsFileHeader(project, fileName) + content + '\n';
    const formatted = await formatSourceCodeWithPrettier(fileName, output);
    await writeFile(fileName, formatted);
    const success = await formatTypescriptFile(project, fileName);

    project.addGeneratedSourceFile({ fileName, success });
};

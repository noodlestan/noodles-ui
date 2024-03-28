import { writeFile } from 'fs/promises';

import { ProjectContext } from '@noodles-ui/support-types';

import { ensuredFiledir, relativePath } from '../../util/fs';
import { diffDateNow, getDateNow } from '../../util/time';
import { formatTypescriptFile } from '../eslint/formatTypescriptFile';
import { TypesToImport, createImportStatements } from '../internal/createImportStatements';
import { formatSourceCodeWithPrettier } from '../prettier/formatSourceCodeWithPrettier';
import { surfacesIndexFileName } from '../surfaces/paths/surfacesIndexFileName';
import { importFrameworkTypes } from '../targets/solid-js/importFrameworkTypes';
import { themesIndexFileName } from '../themes/paths/themesIndexFileName';
import { printTypescriptStatements } from '../typescript/printTypescriptStatements';
import { tsFileHeader } from '../typescript/tsFileHeader';

import { declareProps } from './RootComponent/declareProps';
import { exportComponent } from './RootComponent/exportComponent';
import { importRootCss } from './RootComponent/importRootCss';
import { systemRootFileName } from './paths/systemRootFileName';

export const generateRootComponent = async (
    project: ProjectContext,
    targetDir: string,
): Promise<void> => {
    const time = getDateNow();
    const fileName = systemRootFileName(project, targetDir);
    await ensuredFiledir(fileName);

    const surfacesPath = relativePath(fileName, surfacesIndexFileName(targetDir), true);
    const themesPath = relativePath(fileName, themesIndexFileName(targetDir), true);

    const internalTypes: TypesToImport = [
        ['@noodles-ui/core-services', ['RootProvider, surfacesStore, themesStore']],
        ['@noodles-ui/core-styled', ['surfaceClassList']],
        ['@noodles-ui/core-types', ['ColourSchemeName']],
    ];
    const localImports: TypesToImport = [
        [surfacesPath, 'surfaces'],
        [themesPath, 'themes'],
    ];
    const statements = [
        importFrameworkTypes(true),
        ...createImportStatements([...internalTypes, ...localImports]),
        importRootCss(project, fileName, targetDir),
        declareProps(),
        exportComponent(project),
    ];

    const content = await printTypescriptStatements(statements);
    const output = tsFileHeader(project, fileName) + content + '\n';
    const formatted = await formatSourceCodeWithPrettier(fileName, output);
    await writeFile(fileName, formatted);
    const success = await formatTypescriptFile(project, fileName);

    project.addGeneratedSourceFile({ fileName, success, time: diffDateNow(time) });
};

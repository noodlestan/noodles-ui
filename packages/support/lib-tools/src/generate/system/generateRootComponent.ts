import { writeFile } from 'fs/promises';

import { CompilerContext } from '@noodles-ui/core-compiler';

import { ensuredFiledir } from '../../util/ensuredFiledir';
import { relativePath } from '../../util/relativePath';
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
import { importRootCssTokens } from './RootComponent/importRootCssTokens';
import { importRootScssModule } from './RootComponent/importRootScssModule';
import { systemRootFileName } from './paths/systemRootFileName';

export const generateRootComponent = async (
    compiler: CompilerContext,
    targetDir: string,
): Promise<void> => {
    const time = getDateNow();
    const fileName = systemRootFileName(compiler, targetDir);
    await ensuredFiledir(fileName);

    const surfacesPath = relativePath(fileName, surfacesIndexFileName(targetDir), true);
    const themesPath = relativePath(fileName, themesIndexFileName(targetDir), true);

    const internalTypes: TypesToImport = [
        ['@noodles-ui/solidjs-services', ['RootProvider, surfacesStore, themesStore']],
        ['@noodles-ui/core-types', ['ColourSchemeName']],
    ];

    const localImports: TypesToImport = [
        [surfacesPath, 'surfaces'],
        [themesPath, 'themes'],
    ];
    const statements = [
        importFrameworkTypes(true),
        ...createImportStatements([...internalTypes, ...localImports]),
        importRootCssTokens(compiler, fileName, targetDir),
        importRootScssModule(compiler, fileName, targetDir),
        declareProps(),
        exportComponent(compiler),
    ];

    const content = await printTypescriptStatements(statements);
    const output = tsFileHeader(compiler, fileName) + content + '\n';
    const formatted = await formatSourceCodeWithPrettier(fileName, output);
    await writeFile(fileName, formatted);
    const success = await formatTypescriptFile(compiler, fileName);

    compiler.addGeneratedSourceFile({ fileName, success, time: diffDateNow(time) });
};

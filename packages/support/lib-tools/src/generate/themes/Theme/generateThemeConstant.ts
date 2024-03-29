import { writeFile } from 'fs/promises';

import { ProjectContext, ThemeBuildContext } from '@noodles-ui/support-types';

import { ensuredFiledir } from '../../../util/fs';
import { formatTypescriptFile } from '../../eslint/formatTypescriptFile';
import { TypesToImport, createImportStatements } from '../../internal/createImportStatements';
import { formatSourceCodeWithPrettier } from '../../prettier/formatSourceCodeWithPrettier';
import { importFrameworkTypes } from '../../targets/solid-js/importFrameworkTypes';
import { printTypescriptStatements } from '../../typescript/printTypescriptStatements';
import { tsFileHeader } from '../../typescript/tsFileHeader';
import { themeComponentFileName } from '../paths/themeComponentFileName';

import { declareComponent } from './ThemeConstant/declareComponent';
import { exportTheme } from './ThemeConstant/exportTheme';
import { importTokens } from './ThemeConstant/importTokens';

export const generateThemeConstant = async (
    project: ProjectContext,
    targetDir: string,
    theme: ThemeBuildContext,
): Promise<void> => {
    const fileName = themeComponentFileName(targetDir, theme);
    await ensuredFiledir(fileName);

    const internalTypes: TypesToImport = [['@noodles-ui/core-services', ['Theme']]];
    const statements = [
        ...createImportStatements(internalTypes),
        importFrameworkTypes(),
        importTokens(theme),
        declareComponent(),
        exportTheme(theme),
    ];

    const content = await printTypescriptStatements(statements);
    const output = tsFileHeader(project, fileName) + content + '\n';
    const formatted = await formatSourceCodeWithPrettier(fileName, output);
    await writeFile(fileName, formatted);
    const success = await formatTypescriptFile(project, fileName);

    project.addGeneratedSourceFile({ fileName, success });
};

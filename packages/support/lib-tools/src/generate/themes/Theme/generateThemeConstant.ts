import { writeFile } from 'fs/promises';

import { CompilerContext } from '@noodles-ui/core-compiler';
import { ThemeBuildContext } from '@noodles-ui/core-entities';

import { ensureFileDir } from '../../../util/ensureFileDir';
import { diffDateNow, getDateNow } from '../../../util/time';
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
    compiler: CompilerContext,
    targetDir: string,
    theme: ThemeBuildContext,
): Promise<void> => {
    const time = getDateNow();
    const fileName = themeComponentFileName(targetDir, theme);
    await ensureFileDir(fileName);

    const internalTypes: TypesToImport = [['@noodles-ui/core-types', ['Theme']]];
    const statements = [
        ...createImportStatements(internalTypes),
        importFrameworkTypes(),
        importTokens(theme),
        declareComponent(),
        exportTheme(theme),
    ];

    const content = await printTypescriptStatements(statements);
    const output = tsFileHeader(compiler, fileName) + content + '\n';
    const formatted = await formatSourceCodeWithPrettier(fileName, output);
    await writeFile(fileName, formatted);
    const success = await formatTypescriptFile(compiler, fileName);

    compiler.addGeneratedSourceFile({ fileName, success, time: diffDateNow(time) });
};

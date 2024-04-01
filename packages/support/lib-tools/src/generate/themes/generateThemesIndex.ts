import { writeFile } from 'fs/promises';

import { CompilerContext } from '@noodles-ui/core-compiler';

import { ensureFileDir } from '../../util/ensureFileDir';
import { diffDateNow, getDateNow } from '../../util/time';
import { formatTypescriptFile } from '../eslint/formatTypescriptFile';
import { formatSourceCodeWithPrettier } from '../prettier/formatSourceCodeWithPrettier';
import { printTypescriptStatements } from '../typescript/printTypescriptStatements';
import { tsFileHeader } from '../typescript/tsFileHeader';

import { exportThemesStatement } from './ThemesIndex/exportThemesStatement';
import { importThemeStatements } from './ThemesIndex/importThemeStatements';
import { themesIndexFileName } from './paths/themesIndexFileName';

export const generateThemesIndex = async (
    compiler: CompilerContext,
    targetDir: string,
): Promise<void> => {
    const time = getDateNow();
    const fileName = themesIndexFileName(targetDir);
    await ensureFileDir(fileName);

    const statements = [...importThemeStatements(compiler), exportThemesStatement(compiler)];

    const content = await printTypescriptStatements(statements);
    const output = tsFileHeader(compiler, fileName) + content + '\n';
    const formatted = await formatSourceCodeWithPrettier(fileName, output);
    await writeFile(fileName, formatted);
    const success = await formatTypescriptFile(compiler, fileName);

    compiler.addGeneratedSourceFile({ fileName, success, time: diffDateNow(time) });
};

import { writeFile } from 'fs/promises';

import { ProjectContext } from '@noodles-ui/support-types';

import { ensuredFiledir } from '../../util/fs';
import { formatTypescriptFile } from '../eslint/formatTypescriptFile';
import { formatSourceCodeWithPrettier } from '../prettier/formatSourceCodeWithPrettier';
import { printTypescriptStatements } from '../typescript/printTypescriptStatements';
import { tsFileHeader } from '../typescript/tsFileHeader';

import { exportThemesStatement } from './ThemesIndex/statements/exportThemesStatement';
import { importThemeStatements } from './ThemesIndex/statements/importThemeStatements';
import { themesIndexFileName } from './paths/themesIndexFileName';

export const generateThemesIndex = async (
    project: ProjectContext,
    targetDir: string,
): Promise<void> => {
    const fileName = themesIndexFileName(targetDir);
    await ensuredFiledir(fileName);

    const statements = [...importThemeStatements(project), exportThemesStatement(project)];

    const content = await printTypescriptStatements(statements);
    const output = tsFileHeader(project, fileName) + content + '\n';
    const formatted = await formatSourceCodeWithPrettier(fileName, output);
    await writeFile(fileName, formatted);
    const success = await formatTypescriptFile(project, fileName);

    project.addGeneratedSourceFile({ fileName, success });
};

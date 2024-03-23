import { writeFile } from 'fs/promises';

import { ProjectContext, ThemeBuildContext } from '@noodles-ui/support-types';
import ts from 'typescript';

import { ensuredFiledir } from '../../util/fs';
import { formatTypescriptFile } from '../eslint/formatTypescriptFile';
import { factory } from '../generateThemes';
import { formatSourceCodeWithPrettier } from '../prettier/formatSourceCodeWithPrettier';
import { printTypescriptStatements } from '../typescript/printTypescriptStatements';
import { tsFileHeader } from '../typescript/tsFileHeader';

import { themeComponentFileName } from './paths/themeComponentFileName';

const foobar = () =>
    factory.createVariableStatement(
        undefined,
        factory.createVariableDeclarationList(
            [
                factory.createVariableDeclaration(
                    factory.createIdentifier('foo'),
                    undefined,
                    undefined,
                    factory.createStringLiteral('bar'),
                ),
            ],
            ts.NodeFlags.Const,
        ),
    );
export const generateThemeComponent = async (
    project: ProjectContext,
    targetDir: string,
    theme: ThemeBuildContext,
): Promise<void> => {
    const fileName = themeComponentFileName(targetDir, theme);
    await ensuredFiledir(fileName);

    const statements = [foobar()];

    const content = await printTypescriptStatements(statements);
    const output = tsFileHeader(project, fileName) + content + '\n';
    const formatted = await formatSourceCodeWithPrettier(fileName, output);
    await writeFile(fileName, formatted);
    const success = await formatTypescriptFile(project, fileName);

    project.addGeneratedSourceFile({ fileName, success });
};

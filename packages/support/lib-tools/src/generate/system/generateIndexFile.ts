import { writeFile } from 'fs/promises';
import { dirname } from 'path';

import { ProjectContext } from '@noodles-ui/support-types';
import ts from 'typescript';

import { ensuredFiledir, relativePath } from '../../util/fs';
import { componentIndexFileName } from '../components/paths/componentIndexFileName';
import { formatTypescriptFile } from '../eslint/formatTypescriptFile';
import { formatSourceCodeWithPrettier } from '../prettier/formatSourceCodeWithPrettier';
import { printTypescriptStatements } from '../typescript/printTypescriptStatements';
import { tsFileHeader } from '../typescript/tsFileHeader';

import { systemIndexFileName } from './paths/systemIndexFileName';
import { systemRootFileName } from './paths/systemRootFileName';

const factory = ts.factory;

const exportStarFrom = (moduleName: string): ts.Statement => {
    return factory.createExportDeclaration(
        undefined,
        false,
        undefined,
        factory.createStringLiteral(moduleName),
        undefined,
    );
};

const exportProvider = (
    project: ProjectContext,
    fileName: string,
    targetDir: string,
): ts.Statement => {
    const providerFileName = systemRootFileName(project, targetDir);
    const path = relativePath(fileName, providerFileName, true);
    return exportStarFrom(path);
};

const exportComponents = (
    project: ProjectContext,
    fileName: string,
    targetDir: string,
): ts.Statement => {
    const indexFileName = componentIndexFileName(targetDir);
    const path = relativePath(fileName, dirname(indexFileName));
    return exportStarFrom(path);
};

export const generateIndexFile = async (
    project: ProjectContext,
    targetDir: string,
): Promise<void> => {
    const fileName = systemIndexFileName(targetDir);
    await ensuredFiledir(fileName);

    const statements = [
        exportProvider(project, fileName, targetDir),
        exportComponents(project, fileName, targetDir),
    ];

    const content = await printTypescriptStatements(statements);
    const output = tsFileHeader(project, fileName) + content + '\n';
    const formatted = await formatSourceCodeWithPrettier(fileName, output);
    await writeFile(fileName, formatted);
    const success = await formatTypescriptFile(project, fileName);

    project.addGeneratedSourceFile({ fileName, success });
};

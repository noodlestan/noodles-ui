import { writeFile } from 'fs/promises';
import { dirname } from 'path';

import { CompilerContext } from '@noodles-ui/core-compiler';
import { getComponents } from '@noodles-ui/core-entities';
import ts from 'typescript';

import { ensureFileDir } from '../../util/ensureFileDir';
import { relativePath } from '../../util/relativePath';
import { diffDateNow, getDateNow } from '../../util/time';
import { componentIndexFileName } from '../components/paths/componentIndexFileName';
import { formatTypescriptFile } from '../eslint/formatTypescriptFile';
import { formatSourceCodeWithPrettier } from '../prettier/formatSourceCodeWithPrettier';
import { printTypescriptStatements } from '../typescript/printTypescriptStatements';
import { tsFileHeader } from '../typescript/tsFileHeader';

import { systemIndexFileName } from './paths/systemIndexFileName';
import { systemRootFileName } from './paths/systemRootFileName';

const factory = ts.factory;

const createExportStarFrom = (moduleName: string): ts.Statement => {
    return factory.createExportDeclaration(
        undefined,
        false,
        undefined,
        factory.createStringLiteral(moduleName),
        undefined,
    );
};

const createExportProvider = (
    compiler: CompilerContext,
    fileName: string,
    targetDir: string,
): ts.Statement => {
    const providerFileName = systemRootFileName(compiler, targetDir);
    const path = relativePath(fileName, providerFileName, true);
    return createExportStarFrom(path);
};

const createExportComponents = (
    compiler: CompilerContext,
    fileName: string,
    targetDir: string,
): ts.Statement => {
    const indexFileName = componentIndexFileName(targetDir);
    const path = relativePath(fileName, dirname(indexFileName));
    return createExportStarFrom(path);
};

export const generateIndexFile = async (
    compiler: CompilerContext,
    targetDir: string,
): Promise<void> => {
    const time = getDateNow();
    const fileName = systemIndexFileName(targetDir);
    await ensureFileDir(fileName);

    const hasComponents = getComponents(compiler).length > 0;

    const exportProvider = [createExportProvider(compiler, fileName, targetDir)];
    const exportComponents = hasComponents
        ? [createExportComponents(compiler, fileName, targetDir)]
        : [];

    const statements = [...exportProvider, ...exportComponents];

    const content = await printTypescriptStatements(statements);
    const output = tsFileHeader(compiler, fileName) + content + '\n';
    const formatted = await formatSourceCodeWithPrettier(fileName, output);
    await writeFile(fileName, formatted);
    const success = await formatTypescriptFile(compiler, fileName);

    compiler.addGeneratedSourceFile({ fileName, success, time: diffDateNow(time) });
};

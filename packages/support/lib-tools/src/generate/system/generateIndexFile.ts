import { writeFile } from 'fs/promises';
import { dirname } from 'path';

import { CompilerContext } from '@noodles-ui/core-compiler';
import ts from 'typescript';

import { ensuredFiledir, relativePath } from '../../util/fs';
import { diffDateNow, getDateNow } from '../../util/time';
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
    compiler: CompilerContext,
    fileName: string,
    targetDir: string,
): ts.Statement => {
    const providerFileName = systemRootFileName(compiler, targetDir);
    const path = relativePath(fileName, providerFileName, true);
    return exportStarFrom(path);
};

const exportComponents = (
    compiler: CompilerContext,
    fileName: string,
    targetDir: string,
): ts.Statement => {
    const indexFileName = componentIndexFileName(targetDir);
    const path = relativePath(fileName, dirname(indexFileName));
    return exportStarFrom(path);
};

export const generateIndexFile = async (
    compiler: CompilerContext,
    targetDir: string,
): Promise<void> => {
    const time = getDateNow();
    const fileName = systemIndexFileName(targetDir);
    await ensuredFiledir(fileName);

    const statements = [
        exportProvider(compiler, fileName, targetDir),
        exportComponents(compiler, fileName, targetDir),
    ];

    const content = await printTypescriptStatements(statements);
    const output = tsFileHeader(compiler, fileName) + content + '\n';
    const formatted = await formatSourceCodeWithPrettier(fileName, output);
    await writeFile(fileName, formatted);
    const success = await formatTypescriptFile(compiler, fileName);

    compiler.addGeneratedSourceFile({ fileName, success, time: diffDateNow(time) });
};

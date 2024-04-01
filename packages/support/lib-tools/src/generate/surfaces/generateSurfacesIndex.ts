import { writeFile } from 'fs/promises';

import { CompilerContext } from '@noodles-ui/core-compiler';

import { ensuredFiledir } from '../../util/ensuredFiledir';
import { diffDateNow, getDateNow } from '../../util/time';
import { formatTypescriptFile } from '../eslint/formatTypescriptFile';
import { TypesToImport, createImportStatements } from '../internal/createImportStatements';
import { formatSourceCodeWithPrettier } from '../prettier/formatSourceCodeWithPrettier';
import { printTypescriptStatements } from '../typescript/printTypescriptStatements';
import { tsFileHeader } from '../typescript/tsFileHeader';

import { exportSurfacesStatement } from './SurfacesIndex/exportSurfacesStatement';
import { surfaceStatements } from './SurfacesIndex/surfaceStatements';
import { surfacesIndexFileName } from './paths/surfacesIndexFileName';

export const generateSurfacesIndex = async (
    compiler: CompilerContext,
    targetDir: string,
): Promise<void> => {
    const time = getDateNow();
    const fileName = surfacesIndexFileName(targetDir);
    await ensuredFiledir(fileName);

    const internalTypes = [['@noodles-ui/core-resources', ['SurfaceResource']]] as TypesToImport;

    const statements = [
        ...createImportStatements(internalTypes),
        ...surfaceStatements(compiler),
        exportSurfacesStatement(compiler),
    ];

    const content = await printTypescriptStatements(statements);
    const output = tsFileHeader(compiler, fileName) + content + '\n';
    const formatted = await formatSourceCodeWithPrettier(fileName, output);
    await writeFile(fileName, formatted);
    const success = await formatTypescriptFile(compiler, fileName);

    compiler.addGeneratedSourceFile({ fileName, success, time: diffDateNow(time) });
};

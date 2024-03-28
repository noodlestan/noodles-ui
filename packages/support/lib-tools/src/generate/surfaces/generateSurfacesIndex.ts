import { writeFile } from 'fs/promises';

import { ProjectContext } from '@noodles-ui/support-types';

import { ensuredFiledir } from '../../util/fs';
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
    project: ProjectContext,
    targetDir: string,
): Promise<void> => {
    const time = getDateNow();
    const fileName = surfacesIndexFileName(targetDir);
    await ensuredFiledir(fileName);

    const internalTypes = [['@noodles-ui/core-types', ['SurfaceResource']]] as TypesToImport;

    const statements = [
        ...createImportStatements(internalTypes),
        ...surfaceStatements(project),
        exportSurfacesStatement(project),
    ];

    const content = await printTypescriptStatements(statements);
    const output = tsFileHeader(project, fileName) + content + '\n';
    const formatted = await formatSourceCodeWithPrettier(fileName, output);
    await writeFile(fileName, formatted);
    const success = await formatTypescriptFile(project, fileName);

    project.addGeneratedSourceFile({ fileName, success, time: diffDateNow(time) });
};

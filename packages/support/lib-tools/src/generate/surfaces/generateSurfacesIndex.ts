import { writeFile } from 'fs/promises';

import { ProjectContext } from '@noodles-ui/support-types';

import { ensuredFiledir } from '../../util/fs';
import { formatTypescriptFile } from '../eslint/formatTypescriptFile';
import { formatSourceCodeWithPrettier } from '../prettier/formatSourceCodeWithPrettier';
import { printTypescriptStatements } from '../typescript/printTypescriptStatements';
import { tsFileHeader } from '../typescript/tsFileHeader';

import { exportSurfacesStatement } from './SurfacesIndex/exportSurfacesStatement';
import { importTypesStatement } from './SurfacesIndex/importTypesStatement';
import { surfaceStatements } from './SurfacesIndex/surfaceStatements';
import { surfacesFileName } from './paths/surfacesFileName';

export const generateSurfacesIndex = async (
    project: ProjectContext,
    targetDir: string,
): Promise<void> => {
    const fileName = surfacesFileName(targetDir);
    await ensuredFiledir(fileName);

    const statements = [
        importTypesStatement(),
        ...surfaceStatements(project),
        exportSurfacesStatement(project),
    ];

    const content = await printTypescriptStatements(statements);
    const output = tsFileHeader(project, fileName) + content + '\n';
    const formatted = await formatSourceCodeWithPrettier(fileName, output);
    await writeFile(fileName, formatted);
    const success = await formatTypescriptFile(project, fileName);

    project.addGeneratedSourceFile({ fileName, success });
};

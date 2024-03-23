import { writeFile } from 'fs/promises';

import { ProjectContext } from '@noodles-ui/support-types';

import { formatTypescriptFile } from '../eslint/formatTypescriptFile';
import { formatSourceCodeWithPrettier } from '../prettier/formatSourceCodeWithPrettier';
import { printTypescriptStatements } from '../typescript/printTypescriptStatements';
import { tsFileHeader } from '../typescript/tsFileHeader';

import { declareProps } from './RootComponent/declareProps';
import { exportComponent } from './RootComponent/exportComponent';
import { importFrameworkComponent } from './RootComponent/importFrameworkComponent';
import { importInternalTypes } from './RootComponent/importInternalTypes';
import { importSurfaces } from './RootComponent/importSurfaces';
import { importThemes } from './RootComponent/importThemes';
import { systemRootFileName } from './paths/systemRootFileName';

export const generateRootComponent = async (
    project: ProjectContext,
    targetDir: string,
): Promise<void> => {
    const fileName = systemRootFileName(targetDir);

    const statements = [
        importFrameworkComponent(),
        ...importInternalTypes(),
        importSurfaces(),
        importThemes(),
        declareProps(),
        exportComponent(),
    ];

    const content = await printTypescriptStatements(statements);
    const output = tsFileHeader(project, fileName) + content + '\n';
    const formatted = await formatSourceCodeWithPrettier(fileName, output);
    await writeFile(fileName, formatted);
    const success = await formatTypescriptFile(project, fileName);

    project.addGeneratedSourceFile({ fileName, success });
};

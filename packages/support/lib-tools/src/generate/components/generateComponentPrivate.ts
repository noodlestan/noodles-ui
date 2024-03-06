import { writeFile } from 'fs/promises';

import { ComponentResource, RenderedComponentResource } from '@noodles-ui/core-types';

import { formatFileNameRelativeToProject } from '../../cli/format/formatFileNameRelativeToProject';
import { logError } from '../../cli/logger/logError';
import { logSuccess } from '../../cli/logger/logSuccess';
import { ComponentContext, ProjectContext } from '../../types/projects';
import { formatTypescriptFile } from '../eslint/formatTypescriptFile';
import { formatSourceCodeWithPrettier } from '../prettier/formatSourceCodeWithPrettier';
import { printTypescriptStatements } from '../typescript/printTypescriptStatements';
import { tsFileHeader } from '../typescript/tsFileHeader';

import { componentGeneratedFileName } from './paths/componentGeneratedFileName';
import { exportComponent } from './statements/exportComponent';
import { exportComponentProps } from './statements/exportComponentProps';
import { importComponentStyles } from './statements/importComponentStyles';
import { importFrameworkComponent } from './statements/importFrameworkComponent';
import { importRenderedComponent } from './statements/importRenderedComponent';

export const generateComponentPrivate = async (
    project: ProjectContext,
    key: string,
    component: ComponentContext,
    instance: ComponentResource,
): Promise<void> => {
    const fileName = componentGeneratedFileName(project, instance);

    const rendered = instance.render as RenderedComponentResource;
    const statements = [
        importFrameworkComponent(),
        importRenderedComponent(rendered),
        importComponentStyles(instance),
        exportComponentProps(instance),
        exportComponent(instance),
    ];

    const content = await printTypescriptStatements(statements);
    const output = tsFileHeader(project, fileName) + content + '\n';
    const formatted = await formatSourceCodeWithPrettier(fileName, output);
    await writeFile(fileName, formatted);
    const success = await formatTypescriptFile(project, fileName);

    if (success) {
        logSuccess('generated', formatFileNameRelativeToProject(project.build.modules, fileName));
    } else {
        logError(
            'Error generating',
            formatFileNameRelativeToProject(project.build.modules, fileName),
        );
    }
};
import { writeFile } from 'fs/promises';
import { dirname, relative } from 'path';

import { ComponentResource } from '@noodles-ui/core-types';

import { formatFileNameRelativeToProject } from '../cli/format/formatFileNameRelativeToProject';
import { logError } from '../cli/logger/logError';
import { logSuccess } from '../cli/logger/logSuccess';
import { ComponentContext, ProjectContext } from '../types/projects';

import { componentGeneratedFileName } from './components/paths/componentGeneratedFileName';
import { componentListFileName } from './components/paths/componentListFileName';
import { componentPublicFileName } from './components/paths/componentPublicFileName';
import { formatTypescriptFile } from './eslint/formatTypescriptFile';
import { removeExtension } from './files/removeExtension';
import { tsFileHeader } from './typescript/tsFileHeader';

const generateComponentLine = (
    project: ProjectContext,
    key: string,
    component: ComponentContext,
    instance: ComponentResource,
): string => {
    const name = instance.name;
    const publicPath = componentPublicFileName(project, instance);
    const generatedPath = componentGeneratedFileName(project, instance);

    const path = relative(dirname(generatedPath), publicPath);
    return `export { ${name} } from '${removeExtension(path)}';`;
};

export const generateComponentsList = async (project: ProjectContext): Promise<void> => {
    const lines = Array.from(project.components.items.entries())
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .filter(([_, item]) => item.public)
        .map(([key, item]) => {
            if (!item.instance) {
                throw new Error('Missing instance');
            }
            return generateComponentLine(project, key, item, item.instance);
        });
    const content = [...lines].join('\n');

    const fileName = componentListFileName(project);
    const output = tsFileHeader(project, fileName) + content + '\n';
    await writeFile(fileName, output);
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

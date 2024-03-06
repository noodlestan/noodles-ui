import { existsSync } from 'fs';
import { writeFile } from 'fs/promises';
import { dirname, relative } from 'path';

import { ComponentResource } from '@noodles-ui/core-types';

import { formatFileNameRelativeToProject } from '../../cli/format/formatFileNameRelativeToProject';
import { logSuccess } from '../../cli/logger/logSuccess';
import { ComponentContext, ProjectContext } from '../../types/projects';
import { removeExtension } from '../files/removeExtension';
import { tsFileHeader } from '../typescript/tsFileHeader';

import { componentGeneratedFileName } from './paths/componentGeneratedFileName';
import { componentPublicFileName } from './paths/componentPublicFileName';

export const generateComponentPublic = async (
    project: ProjectContext,
    key: string,
    component: ComponentContext,
    instance: ComponentResource,
): Promise<void> => {
    const name = component.instance?.name;
    const generatedPath = componentGeneratedFileName(project, instance);
    const fileName = componentPublicFileName(project, instance);

    const path = relative(dirname(fileName), generatedPath);
    const content = `export { ${name} } from '${removeExtension(path)}';`;

    const output = tsFileHeader(project, fileName) + content + '\n';
    if (!existsSync(fileName)) {
        await writeFile(fileName, output);
        logSuccess('generated', formatFileNameRelativeToProject(project.build.modules, fileName));
    } else {
        logSuccess('! skipped', formatFileNameRelativeToProject(project.build.modules, fileName));
    }
};

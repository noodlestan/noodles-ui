import { writeFile } from 'fs/promises';
import { dirname, relative } from 'path';

import { ComponentBuildContext, ProjectContext } from '@noodles-ui/support-types';

import { ensuredFiledir, removeExtension } from '../../util/fs';
import { formatTypescriptFile } from '../eslint/formatTypescriptFile';
import { tsFileHeader } from '../typescript/tsFileHeader';

import { componentFileName } from './paths/componentFileName';
import { componentListFileName } from './paths/componentListFileName';
import { componentPublicFileName } from './paths/componentPublicFileName';

const generateComponentLine = (
    project: ProjectContext,
    key: string,
    component: ComponentBuildContext,
    targetDir: string,
): string => {
    const { entity } = component;
    const name = entity.name;
    const publicPath = componentPublicFileName(project, entity);
    const generatedPath = componentFileName(targetDir, entity);

    const path = relative(dirname(generatedPath), publicPath);
    return `export { ${name}, ${name}Props } from '${removeExtension(path)}';`;
};

export const generateComponentsList = async (
    project: ProjectContext,
    targetDir: string,
): Promise<void> => {
    const fileName = componentListFileName(targetDir);
    await ensuredFiledir(fileName);

    const lines = Array.from(project.entities.component.entries())
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .filter(([_, item]) => item.context.public)
        .map(([key, item]) => {
            return generateComponentLine(project, key, item, targetDir);
        });
    const content = [...lines].join('\n');

    const output = tsFileHeader(project, fileName) + content + '\n';
    await writeFile(fileName, output);
    const success = await formatTypescriptFile(project, fileName);

    project.addGeneratedSourceFile({ fileName, success });
};

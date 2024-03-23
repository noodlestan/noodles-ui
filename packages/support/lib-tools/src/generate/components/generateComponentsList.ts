import { writeFile } from 'fs/promises';
import { dirname, relative } from 'path';

import { ComponentBuildContext, ProjectContext } from '@noodles-ui/support-types';

import { removeExtension } from '../../util/fs';
import { formatTypescriptFile } from '../eslint/formatTypescriptFile';
import { tsFileHeader } from '../typescript/tsFileHeader';

import { componentGeneratedFileName } from './paths/componentGeneratedFileName';
import { componentListFileName } from './paths/componentListFileName';
import { componentPublicFileName } from './paths/componentPublicFileName';

const generateComponentLine = (
    project: ProjectContext,
    key: string,
    component: ComponentBuildContext,
): string => {
    const { entity } = component;
    const name = entity.name;
    const publicPath = componentPublicFileName(project, entity);
    const generatedPath = componentGeneratedFileName(project, entity);

    const path = relative(dirname(generatedPath), publicPath);
    return `export { ${name}, ${name}Props } from '${removeExtension(path)}';`;
};

export const generateComponentsList = async (project: ProjectContext): Promise<void> => {
    const lines = Array.from(project.entities.component.entries())
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .filter(([_, item]) => item.context.public)
        .map(([key, item]) => {
            return generateComponentLine(project, key, item);
        });
    const content = [...lines].join('\n');

    const fileName = componentListFileName(project);
    const output = tsFileHeader(project, fileName) + content + '\n';
    await writeFile(fileName, output);
    const success = await formatTypescriptFile(project, fileName);

    project.addGeneratedSourceFile({ fileName, success });
};

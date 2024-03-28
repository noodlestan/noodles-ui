import { writeFile } from 'fs/promises';

import { ComponentBuildContext, ProjectContext } from '@noodles-ui/support-types';

import { ensuredFiledir, relativePath } from '../../util/fs';
import { diffDateNow, getDateNow } from '../../util/time';
import { formatTypescriptFile } from '../eslint/formatTypescriptFile';
import { tsFileHeader } from '../typescript/tsFileHeader';

import { componentFileName } from './paths/componentFileName';
import { componentIndexFileName } from './paths/componentIndexFileName';

const generateComponentLine = (
    project: ProjectContext,
    key: string,
    component: ComponentBuildContext,
    fileName: string,
    targetDir: string,
): string => {
    const { entity } = component;
    const name = entity.name;
    const generatedPath = componentFileName(targetDir, entity);

    const path = relativePath(fileName, generatedPath, true);
    return `export { ${name}, ${name}Props } from '${path}';`;
};

export const generateComponentsList = async (
    project: ProjectContext,
    targetDir: string,
): Promise<void> => {
    const time = getDateNow();
    const fileName = componentIndexFileName(targetDir);
    await ensuredFiledir(fileName);

    const lines = Array.from(project.entities.component.entries())
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .filter(([_, item]) => item.context.public)
        .map(([key, item]) => {
            return generateComponentLine(project, key, item, fileName, targetDir);
        });
    const content = [...lines].join('\n');

    const output = tsFileHeader(project, fileName) + content + '\n';
    await writeFile(fileName, output);
    const success = await formatTypescriptFile(project, fileName);

    project.addGeneratedSourceFile({ fileName, success, time: diffDateNow(time) });
};

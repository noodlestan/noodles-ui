import { existsSync } from 'fs';
import { writeFile } from 'fs/promises';
import { dirname, relative } from 'path';

import { ComponentBuildContext, ProjectContext } from '@noodles-ui/support-types';

import { removeExtension } from '../../files/removeExtension';
import { tsFileHeader } from '../../typescript/tsFileHeader';
import { componentGeneratedFileName } from '../paths/componentGeneratedFileName';
import { componentPublicFileName } from '../paths/componentPublicFileName';

export const generateComponentPublic = async (
    project: ProjectContext,
    component: ComponentBuildContext,
): Promise<void> => {
    const { entity } = component;
    const name = entity.name;
    const generatedPath = componentGeneratedFileName(project, component.entity);
    const fileName = componentPublicFileName(project, component.entity);

    const path = relative(dirname(fileName), generatedPath);
    const content = `export { ${name}, ${name}Props } from '${removeExtension(path)}';`;

    const output = tsFileHeader(project, fileName) + content + '\n';
    if (!existsSync(fileName)) {
        await writeFile(fileName, output);
        project.addGeneratedSourceFile({ fileName, success: true });
    } else {
        project.addGeneratedSourceFile({ fileName, skipped: true });
    }
};

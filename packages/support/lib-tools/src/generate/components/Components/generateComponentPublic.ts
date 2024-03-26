import { existsSync } from 'fs';
import { writeFile } from 'fs/promises';

import { ComponentBuildContext, ProjectContext } from '@noodles-ui/support-types';

import { ensuredFiledir, relativePath } from '../../../util/fs';
import { tsFileHeader } from '../../typescript/tsFileHeader';
import { componentFileName } from '../paths/componentFileName';
import { componentPublicFileName } from '../paths/componentPublicFileName';

export const generateComponentPublic = async (
    project: ProjectContext,
    component: ComponentBuildContext,
    targetDir: string,
): Promise<void> => {
    const fileName = componentPublicFileName(project, component.entity);
    await ensuredFiledir(fileName);

    const { entity } = component;
    const name = entity.name;
    const generatedPath = componentFileName(targetDir, component.entity);

    const path = relativePath(fileName, generatedPath, true);
    const content = `export { ${name}, ${name}Props } from '${path}';`;

    const output = tsFileHeader(project, fileName) + content + '\n';
    if (!existsSync(fileName)) {
        await writeFile(fileName, output);
        project.addGeneratedSourceFile({ fileName, success: true });
    } else {
        project.addGeneratedSourceFile({ fileName, skipped: true });
    }
};

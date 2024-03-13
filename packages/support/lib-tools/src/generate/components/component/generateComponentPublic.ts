import { existsSync } from 'fs';
import { writeFile } from 'fs/promises';
import { dirname, relative } from 'path';

import { ComponentContextWithInstance, ProjectContext } from '../../../types/projects';
import { removeExtension } from '../../files/removeExtension';
import { tsFileHeader } from '../../typescript/tsFileHeader';
import { componentGeneratedFileName } from '../paths/componentGeneratedFileName';
import { componentPublicFileName } from '../paths/componentPublicFileName';

export const generateComponentPublic = async (
    project: ProjectContext,
    key: string,
    component: ComponentContextWithInstance,
): Promise<void> => {
    const name = component.instance.name;
    const generatedPath = componentGeneratedFileName(project, component.instance);
    const fileName = componentPublicFileName(project, component.instance);

    const path = relative(dirname(fileName), generatedPath);
    const content = `export { ${name} } from '${removeExtension(path)}';`;

    const output = tsFileHeader(project, fileName) + content + '\n';
    if (!existsSync(fileName)) {
        await writeFile(fileName, output);
        project.addGeneratedSourceFile({ fileName, success: true });
    } else {
        project.addGeneratedSourceFile({ fileName, skipped: true });
    }
};

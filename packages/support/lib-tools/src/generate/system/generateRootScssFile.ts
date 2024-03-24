import { writeFile } from 'fs/promises';

import { ProjectContext } from '@noodles-ui/support-types';

import { ensuredFiledir, relativePath } from '../../util/fs';
import { tsFileHeader } from '../typescript/tsFileHeader';
import { variantsScssFileName } from '../variants/paths/variantsScssFileName';

import { systemRootScssFileName } from './paths/systemRootScssFileName';

export const generateRootScssFile = async (
    project: ProjectContext,
    targetDir: string,
): Promise<void> => {
    const fileName = systemRootScssFileName(targetDir);
    await ensuredFiledir(fileName);

    const variantsFileName = variantsScssFileName(targetDir);
    const importVariants = `@import '${relativePath(fileName, variantsFileName)}';`;

    const lines = [importVariants];
    const content = [...lines].join('\n');

    const output = tsFileHeader(project, fileName) + content + '\n';
    await writeFile(fileName, output);

    project.addGeneratedSourceFile({ fileName, success: true });
};

import { writeFile } from 'fs/promises';

import { formatFileNameRelativeToProject } from '../../cli/format/formatFileNameRelativeToProject';
import { logSuccess } from '../../cli/logger/logSuccess';
import { ProjectContext, VariantContextWithInstance } from '../../types/projects';
import { tsFileHeader } from '../typescript/tsFileHeader';

import { variantsScssFileName } from './paths/variantsScssFileName';

const generateVariantLine = (
    project: ProjectContext,
    variant: VariantContextWithInstance,
): string => {
    const { instance } = variant;
    const options = instance.options?.map(option => `'${option}'`).join(', ');
    return `$${instance.name}: ${options};`;
};

export const generateVariantsScssVars = async (project: ProjectContext): Promise<void> => {
    const variants = Array.from(project.variants.items.values()).filter(item => {
        if (!item.instance) {
            throw new Error('Missing instance');
        }
        return item.public;
    }) as VariantContextWithInstance[];

    const lines = variants.map(item => generateVariantLine(project, item));
    const content = [...lines].join('\n');

    const fileName = variantsScssFileName(project);
    const output = tsFileHeader(project, fileName) + content + '\n';
    await writeFile(fileName, output);

    logSuccess('generated', formatFileNameRelativeToProject(project.build.modules, fileName));
};

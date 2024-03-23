import { writeFile } from 'fs/promises';

import { ProjectContext, VariantBuildContext } from '@noodles-ui/support-types';

import { tsFileHeader } from '../typescript/tsFileHeader';

import { variantsScssFileName } from './paths/variantsScssFileName';

const generateVariantLine = (project: ProjectContext, variant: VariantBuildContext): string => {
    const { entity } = variant;
    const options = entity.options?.map(option => `'${option}'`).join(', ');
    return `$${entity.name}: ${options};`;
};

export const generateVariantsScssVars = async (project: ProjectContext): Promise<void> => {
    const variants = Array.from(project.entities.variant.values()).filter(item => {
        return item.context.public;
    });

    const lines = variants.map(item => generateVariantLine(project, item));
    const content = [...lines].join('\n');

    const fileName = variantsScssFileName(project);
    const output = tsFileHeader(project, fileName) + content + '\n';
    await writeFile(fileName, output);

    project.addGeneratedSourceFile({ fileName, success: true });
};

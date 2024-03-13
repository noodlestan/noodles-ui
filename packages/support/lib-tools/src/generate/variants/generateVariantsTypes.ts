import { writeFile } from 'fs/promises';

import { ProjectContext, VariantContextWithInstance } from '../../types/projects';
import { formatTypescriptFile } from '../eslint/formatTypescriptFile';
import { tsFileHeader } from '../typescript/tsFileHeader';

import { variantsTypesFileName } from './paths/variantsTypesFileName';

const generateVariantLine = (
    project: ProjectContext,
    variant: VariantContextWithInstance,
): string => {
    const { instance } = variant;
    const options = instance.options?.map(option => `'${option}'`).join(' | ');
    return `export type ${instance.name} = ${options};`;
};

export const generateVariantsTypes = async (project: ProjectContext): Promise<void> => {
    const variants = Array.from(project.variants.values()).filter(item => {
        if (!item.instance) {
            throw new Error('Missing instance');
        }
        return item.public;
    }) as VariantContextWithInstance[];

    const lines = variants.map(item => generateVariantLine(project, item));
    const content = [...lines].join('\n');

    const fileName = variantsTypesFileName(project);
    const output = tsFileHeader(project, fileName) + content + '\n';
    await writeFile(fileName, output);
    const success = await formatTypescriptFile(project, fileName);

    project.addGeneratedSourceFile({ fileName, success });
};

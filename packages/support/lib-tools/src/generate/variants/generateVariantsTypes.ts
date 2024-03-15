import { writeFile } from 'fs/promises';

import { ProjectContext, VariantBuildContext } from '@noodles-ui/support-types';

import { formatTypescriptFile } from '../eslint/formatTypescriptFile';
import { tsFileHeader } from '../typescript/tsFileHeader';

import { variantsTypesFileName } from './paths/variantsTypesFileName';

const generateVariantLine = (project: ProjectContext, variant: VariantBuildContext): string => {
    const { entity } = variant;
    const options = entity.options?.map(option => `'${option}'`).join(' | ');
    return `export type ${entity.name} = ${options};`;
};

export const generateVariantsTypes = async (project: ProjectContext): Promise<void> => {
    const variants = Array.from(project.entities.variant.values()).filter(item => {
        return item.context.public;
    }) as VariantBuildContext[];

    const lines = variants.map(item => generateVariantLine(project, item));
    const content = [...lines].join('\n');

    const fileName = variantsTypesFileName(project);
    const output = tsFileHeader(project, fileName) + content + '\n';
    await writeFile(fileName, output);
    const success = await formatTypescriptFile(project, fileName);

    project.addGeneratedSourceFile({ fileName, success });
};

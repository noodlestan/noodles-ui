import { writeFile } from 'fs/promises';

import { ProjectContext, VariantBuildContext } from '@noodles-ui/support-types';

import { ensuredFiledir } from '../../util/fs';
import { diffDateNow, getDateNow } from '../../util/time';
import { formatTypescriptFile } from '../eslint/formatTypescriptFile';
import { tsFileHeader } from '../typescript/tsFileHeader';

import { variantsTypesFileName } from './paths/variantsTypesFileName';

const generateVariantLine = (project: ProjectContext, variant: VariantBuildContext): string => {
    const { entity } = variant;
    const options = entity.options?.map(option => `'${option}'`).join(' | ');
    return `export type ${entity.name} = ${options};`;
};

export const generateVariantsTypes = async (
    project: ProjectContext,
    targetDir: string,
): Promise<void> => {
    const time = getDateNow();
    const fileName = variantsTypesFileName(targetDir);
    await ensuredFiledir(fileName);

    const variants = Array.from(project.entities.variant.values()).filter(item => {
        return item.context.public;
    });

    const lines = variants.map(item => generateVariantLine(project, item));
    const content = [...lines].join('\n');

    const output = tsFileHeader(project, fileName) + content + '\n';
    await writeFile(fileName, output);
    const success = await formatTypescriptFile(project, fileName);

    project.addGeneratedSourceFile({ fileName, success, time: diffDateNow(time) });
};

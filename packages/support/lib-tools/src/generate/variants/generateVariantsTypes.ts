import { writeFile } from 'fs/promises';

import { VariantResource } from '@noodles-ui/core-types';

import { formatFileNameRelativeToProject } from '../../cli/format/formatFileNameRelativeToProject';
import { logError } from '../../cli/logger/logError';
import { logSuccess } from '../../cli/logger/logSuccess';
import { ProjectContext, WithInstance } from '../../types/projects';
import { formatTypescriptFile } from '../eslint/formatTypescriptFile';
import { tsFileHeader } from '../typescript/tsFileHeader';

import { variantsTypesFileName } from './paths/variantsTypesFileName';

const generateVariantLine = (
    project: ProjectContext,
    variant: WithInstance<VariantResource>,
): string => {
    const { instance } = variant;
    const options = instance.options?.map(option => `'${option}'`).join(' | ');
    return `export type ${instance.name} = ${options};`;
};

export const generateVariantsTypes = async (project: ProjectContext): Promise<void> => {
    const variants = Array.from(project.variants.items.values()).map(item => {
        if (!item.instance) {
            throw new Error('Missing instance');
        }
        return item;
    }) as WithInstance<VariantResource>[];

    const lines = variants.map(item => generateVariantLine(project, item));
    const content = [...lines].join('\n');

    const fileName = variantsTypesFileName(project);
    const output = tsFileHeader(project, fileName) + content + '\n';
    await writeFile(fileName, output);
    const success = await formatTypescriptFile(project, fileName);

    if (success) {
        logSuccess('generated', formatFileNameRelativeToProject(project.build.modules, fileName));
    } else {
        logError(
            'Error generating',
            formatFileNameRelativeToProject(project.build.modules, fileName),
        );
    }
};

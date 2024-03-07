import { writeFile } from 'fs/promises';

import { VariantResource } from '@noodles-ui/core-types';

import { formatFileNameRelativeToProject } from '../../cli/format/formatFileNameRelativeToProject';
import { logError } from '../../cli/logger/logError';
import { logSuccess } from '../../cli/logger/logSuccess';
import { ProjectContext, WithInstance } from '../../types/projects';
import { formatTypescriptFile } from '../eslint/formatTypescriptFile';
import { tsFileHeader } from '../typescript/tsFileHeader';

import { variantsConstantsFileName } from './paths/variantsConstantsFileName';

const generateTypeImportLine = (
    project: ProjectContext,
    variants: WithInstance<VariantResource>[],
): string => {
    const names = variants.map(item => item.instance.name);
    return `import { ${names.join(', ')} } from './variants.types';`;
};

const generateVariantLine = (
    project: ProjectContext,
    variant: WithInstance<VariantResource>,
): string => {
    const { instance } = variant;
    const name = `${instance.name}DefaultOption`;
    const type = instance.name;
    const value = `${JSON.stringify(instance.defaultOption)}`;
    return `export const ${name}: ${type} = ${value};`;
};

export const generateVariantsConstants = async (project: ProjectContext): Promise<void> => {
    const variants = Array.from(project.variants.items.values()).filter(item => {
        if (!item.instance) {
            throw new Error('Missing instance');
        }
        return item.instance?.defaultOption;
    }) as WithInstance<VariantResource>[];

    const importsLine = generateTypeImportLine(project, variants);
    const constantsLines = variants.map(item => generateVariantLine(project, item));
    const content = [importsLine, '\n', ...constantsLines].join('\n');

    const fileName = variantsConstantsFileName(project);
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

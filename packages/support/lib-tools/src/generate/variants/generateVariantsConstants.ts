import { writeFile } from 'fs/promises';

import { ProjectContext, VariantBuildContext } from '@noodles-ui/support-types';

import { formatTypescriptFile } from '../eslint/formatTypescriptFile';
import { tsFileHeader } from '../typescript/tsFileHeader';

import { variantsConstantsFileName } from './paths/variantsConstantsFileName';

const generateTypeImportLine = (
    project: ProjectContext,
    variants: VariantBuildContext[],
): string => {
    const names = variants.map(item => item.entity.name);
    return `import { ${names.join(', ')} } from './variants.types';`;
};

const generateVariantLine = (project: ProjectContext, variant: VariantBuildContext): string => {
    const { entity } = variant;
    const name = `${entity.name}DefaultOption`;
    const type = entity.name;
    const value = `${JSON.stringify(entity.defaultValue)}`;
    return `export const ${name}: ${type} = ${value};`;
};

export const generateVariantsConstants = async (project: ProjectContext): Promise<void> => {
    const variants = Array.from(project.entities.variant.values()).filter(item => {
        return item.entity.defaultValue;
    });

    const importsLine = generateTypeImportLine(project, variants);
    const constantsLines = variants.map(item => generateVariantLine(project, item));
    const content = [importsLine, '\n', ...constantsLines].join('\n');

    const fileName = variantsConstantsFileName(project);
    const output = tsFileHeader(project, fileName) + content + '\n';
    await writeFile(fileName, output);
    const success = await formatTypescriptFile(project, fileName);

    project.addGeneratedSourceFile({ fileName, success });
};

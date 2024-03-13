import { writeFile } from 'fs/promises';

import { ProjectContext, VariantContextWithInstance } from '../../types/projects';
import { formatTypescriptFile } from '../eslint/formatTypescriptFile';
import { tsFileHeader } from '../typescript/tsFileHeader';

import { variantsConstantsFileName } from './paths/variantsConstantsFileName';

const generateTypeImportLine = (
    project: ProjectContext,
    variants: VariantContextWithInstance[],
): string => {
    const names = variants.map(item => item.instance.name);
    return `import { ${names.join(', ')} } from './variants.types';`;
};

const generateVariantLine = (
    project: ProjectContext,
    variant: VariantContextWithInstance,
): string => {
    const { instance } = variant;
    const name = `${instance.name}DefaultOption`;
    const type = instance.name;
    const value = `${JSON.stringify(instance.defaultValue)}`;
    return `export const ${name}: ${type} = ${value};`;
};

export const generateVariantsConstants = async (project: ProjectContext): Promise<void> => {
    const variants = Array.from(project.variants.values()).filter(item => {
        if (!item.instance) {
            throw new Error('Missing instance');
        }
        return item.instance?.defaultValue;
    }) as VariantContextWithInstance[];

    const importsLine = generateTypeImportLine(project, variants);
    const constantsLines = variants.map(item => generateVariantLine(project, item));
    const content = [importsLine, '\n', ...constantsLines].join('\n');

    const fileName = variantsConstantsFileName(project);
    const output = tsFileHeader(project, fileName) + content + '\n';
    await writeFile(fileName, output);
    const success = await formatTypescriptFile(project, fileName);

    project.addGeneratedSourceFile({ fileName, success });
};

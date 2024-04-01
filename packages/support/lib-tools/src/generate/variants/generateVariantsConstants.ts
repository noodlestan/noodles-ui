import { writeFile } from 'fs/promises';

import { CompilerContext } from '@noodles-ui/core-compiler';
import { VariantBuildContext } from '@noodles-ui/core-entities';

import { ensuredFiledir } from '../../util/ensuredFiledir';
import { diffDateNow, getDateNow } from '../../util/time';
import { formatTypescriptFile } from '../eslint/formatTypescriptFile';
import { tsFileHeader } from '../typescript/tsFileHeader';

import { variantsConstantsFileName } from './paths/variantsConstantsFileName';

const generateTypeImportLine = (
    compiler: CompilerContext,
    variants: VariantBuildContext[],
): string => {
    const names = variants.map(item => item.entity.name);
    return `import { ${names.join(', ')} } from './variants.types';`;
};

const generateVariantLine = (compiler: CompilerContext, variant: VariantBuildContext): string => {
    const { entity } = variant;
    const name = `${entity.name}DefaultOption`;
    const type = entity.name;
    const value = `${JSON.stringify(entity.defaultValue)}`;
    return `export const ${name}: ${type} = ${value};`;
};

export const generateVariantsConstants = async (
    compiler: CompilerContext,
    targetDir: string,
): Promise<void> => {
    const time = getDateNow();
    const fileName = variantsConstantsFileName(targetDir);
    await ensuredFiledir(fileName);

    const variants = Array.from(compiler.entities.variant.values()).filter(item => {
        return item.entity.defaultValue;
    });

    const importsLine = generateTypeImportLine(compiler, variants);
    const constantsLines = variants.map(item => generateVariantLine(compiler, item));
    const content = [importsLine, '\n', ...constantsLines].join('\n');

    const output = tsFileHeader(compiler, fileName) + content + '\n';
    await writeFile(fileName, output);
    const success = await formatTypescriptFile(compiler, fileName);

    compiler.addGeneratedSourceFile({ fileName, success, time: diffDateNow(time) });
};

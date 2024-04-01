import { writeFile } from 'fs/promises';

import { CompilerContext } from '@noodles-ui/core-compiler';
import { VariantBuildContext } from '@noodles-ui/core-entities';

import { ensureFileDir } from '../../util/ensureFileDir';
import { diffDateNow, getDateNow } from '../../util/time';
import { formatTypescriptFile } from '../eslint/formatTypescriptFile';
import { tsFileHeader } from '../typescript/tsFileHeader';

import { variantsTypesFileName } from './paths/variantsTypesFileName';

const generateVariantLine = (compiler: CompilerContext, variant: VariantBuildContext): string => {
    const { entity } = variant;
    const options = entity.options?.map(option => `'${option}'`).join(' | ');
    return `export type ${entity.name} = ${options};`;
};

export const generateVariantsTypes = async (
    compiler: CompilerContext,
    targetDir: string,
): Promise<void> => {
    const time = getDateNow();
    const fileName = variantsTypesFileName(targetDir);
    await ensureFileDir(fileName);

    const variants = Array.from(compiler.entities.variant.values()).filter(item => {
        return item.context.public;
    });

    const lines = variants.map(item => generateVariantLine(compiler, item));
    const content = [...lines].join('\n');

    const output = tsFileHeader(compiler, fileName) + content + '\n';
    await writeFile(fileName, output);
    const success = await formatTypescriptFile(compiler, fileName);

    compiler.addGeneratedSourceFile({ fileName, success, time: diffDateNow(time) });
};

import { writeFile } from 'fs/promises';

import { CompilerContext } from '@noodles-ui/core-compiler';
import { VariantBuildContext } from '@noodles-ui/core-entities';

import { ensureFileDir } from '../../util/ensureFileDir';
import { diffDateNow, getDateNow } from '../../util/time';
import { tsFileHeader } from '../typescript/tsFileHeader';

import { variantsScssFileName } from './paths/variantsScssFileName';

const generateVariantLine = (compiler: CompilerContext, variant: VariantBuildContext): string => {
    const { entity } = variant;
    const options = entity.options?.map(option => `'${option}'`).join(', ');
    return `$${entity.name}: ${options};`;
};

export const generateVariantsScssVars = async (
    compiler: CompilerContext,
    targetDir: string,
): Promise<void> => {
    const time = getDateNow();
    const fileName = variantsScssFileName(targetDir);
    await ensureFileDir(fileName);

    const variants = Array.from(compiler.entities.variant.values()).filter(item => {
        return item.context.public;
    });

    const lines = variants.map(item => generateVariantLine(compiler, item));
    const content = [...lines].join('\n');

    const output = tsFileHeader(compiler, fileName) + content + '\n';
    await writeFile(fileName, output);

    compiler.addGeneratedSourceFile({ fileName, success: true, time: diffDateNow(time) });
};

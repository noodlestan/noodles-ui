import { writeFile } from 'fs/promises';

import { CompilerContext } from '@noodles-ui/support-types';

import { ensuredFiledir, relativePath } from '../../util/fs';
import { diffDateNow, getDateNow } from '../../util/time';
import { tsFileHeader } from '../typescript/tsFileHeader';
import { variantsScssFileName } from '../variants/paths/variantsScssFileName';

import { systemGlobalsScssFileName } from './paths/systemGlobalsScssFileName';

export const generateGlobalScssFile = async (
    compiler: CompilerContext,
    targetDir: string,
): Promise<void> => {
    const time = getDateNow();
    const fileName = systemGlobalsScssFileName(targetDir);
    await ensuredFiledir(fileName);

    const variantsFileName = variantsScssFileName(targetDir);
    const importVariants = `@import '${relativePath(fileName, variantsFileName)}';`;

    const lines = [importVariants];
    const content = [...lines].join('\n');

    const output = tsFileHeader(compiler, fileName) + content + '\n';
    await writeFile(fileName, output);

    compiler.addGeneratedSourceFile({ fileName, success: true, time: diffDateNow(time) });
};

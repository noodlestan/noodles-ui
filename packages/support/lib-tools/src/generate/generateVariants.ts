import { CompilerContext } from '@noodles-ui/support-types';

import { generateVariantsConstants } from './variants/generateVariantsConstants';
import { generateVariantsScssVars } from './variants/generateVariantsScssVars';
import { generateVariantsTypes } from './variants/generateVariantsTypes';

export const generateVariants = async (
    compiler: CompilerContext,
    targetDir: string,
): Promise<void> => {
    const tasks = [
        generateVariantsConstants(compiler, targetDir),
        generateVariantsScssVars(compiler, targetDir),
        generateVariantsTypes(compiler, targetDir),
    ];

    await Promise.all(tasks);
};

import { ProjectContext } from '@noodles-ui/support-types';

import { generateVariantsConstants } from './variants/generateVariantsConstants';
import { generateVariantsScssVars } from './variants/generateVariantsScssVars';
import { generateVariantsTypes } from './variants/generateVariantsTypes';

export const generateVariants = async (
    project: ProjectContext,
    targetDir: string,
): Promise<void> => {
    const tasks = [
        generateVariantsConstants(project, targetDir),
        generateVariantsScssVars(project, targetDir),
        generateVariantsTypes(project, targetDir),
    ];

    await Promise.all(tasks);
};

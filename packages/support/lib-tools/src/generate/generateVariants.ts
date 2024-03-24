import { ProjectContext } from '@noodles-ui/support-types';

import { generateVariantsConstants } from './variants/generateVariantsConstants';
import { generateVariantsScssVars } from './variants/generateVariantsScssVars';
import { generateVariantsTypes } from './variants/generateVariantsTypes';

export const generateVariants = async (
    project: ProjectContext,
    targetDir: string,
): Promise<void> => {
    const p1 = generateVariantsConstants(project, targetDir);
    const p2 = generateVariantsScssVars(project, targetDir);
    const p3 = generateVariantsTypes(project, targetDir);

    await Promise.all([p1, p2, p3]);
};

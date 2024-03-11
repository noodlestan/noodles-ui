import { ProjectContext } from '../types/projects';

import { generateVariantsConstants } from './variants/generateVariantsConstants';
import { generateVariantsScssVars } from './variants/generateVariantsScssVars';
import { generateVariantsTypes } from './variants/generateVariantsTypes';

export const generateVariants = async (project: ProjectContext): Promise<void> => {
    const p1 = generateVariantsConstants(project);
    const p2 = generateVariantsScssVars(project);
    const p3 = generateVariantsTypes(project);

    await Promise.all([p1, p2, p3]);
};

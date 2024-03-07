import { ProjectContext } from '../../types/projects';

import { generateVariantsConstants } from './generateVariantsConstants';
import { generateVariantsScssVars } from './generateVariantsScssVars';
import { generateVariantsTypes } from './generateVariantsTypes';

export const generateVariants = async (project: ProjectContext): Promise<void> => {
    const p1 = generateVariantsConstants(project);
    const p2 = generateVariantsScssVars(project);
    const p3 = generateVariantsTypes(project);

    await Promise.all([p1, p2, p3]);
};

import { join } from 'path';

import { ProjectContext } from '../../../types/projects';

export const variantsConstantsFileName = (project?: ProjectContext): string => {
    const relativeFileName = 'src/generated/variants.constants.ts';

    if (project) {
        return join(project.projectPath, relativeFileName);
    }
    return relativeFileName;
};

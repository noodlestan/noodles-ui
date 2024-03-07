import { join } from 'path';

import { ProjectContext } from '../../../types/projects';

export const variantsTypesFileName = (project?: ProjectContext): string => {
    const relativeFileName = 'src/generated/variants.types.ts';

    if (project) {
        return join(project.projectPath, relativeFileName);
    }
    return relativeFileName;
};

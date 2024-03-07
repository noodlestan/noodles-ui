import { join } from 'path';

import { ProjectContext } from '../../../types/projects';

export const variantsScssFileName = (project?: ProjectContext): string => {
    const relativeFileName = 'src/generated/variants.scss';

    if (project) {
        return join(project.projectPath, relativeFileName);
    }
    return relativeFileName;
};

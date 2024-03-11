import { join } from 'path';

import { ProjectContext } from '../../../types/projects';
import { NUI_GENERATED_FOLDER } from '../../constants';

export const variantsConstantsFileName = (project?: ProjectContext): string => {
    const relativeFileName = join(NUI_GENERATED_FOLDER, 'variants.constants.ts');

    if (project) {
        return join(project.projectPath, relativeFileName);
    }
    return relativeFileName;
};

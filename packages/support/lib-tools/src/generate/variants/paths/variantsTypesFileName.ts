import { join } from 'path';

import { ProjectContext } from '../../../types/projects';
import { NUI_GENERATED_FOLDER } from '../../constants';

export const variantsTypesFileName = (project?: ProjectContext): string => {
    const relativeFileName = join(NUI_GENERATED_FOLDER, 'variants.types.ts');

    if (project) {
        return join(project.projectPath, relativeFileName);
    }
    return relativeFileName;
};

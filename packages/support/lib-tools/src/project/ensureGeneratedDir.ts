import { mkdir } from 'fs/promises';
import { join } from 'path';

import { NUI_GENERATED_FOLDER } from '../generate/constants';
import { ProjectContext } from '../types/projects';

export const ensureGeneratedDir = async (project: ProjectContext): Promise<void> => {
    const file = join(project.projectPath, NUI_GENERATED_FOLDER);
    await mkdir(file, { recursive: true });
};

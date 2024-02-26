import { mkdir } from 'fs/promises';
import { join } from 'path';

import { NUI_CACHE_FOLDER } from '../resources/constants';
import { ProjectContext } from '../types/projects';

export const ensureProjectCacheDir = async (project: ProjectContext): Promise<void> => {
    const file = join(project.projectPath, NUI_CACHE_FOLDER);
    await mkdir(file, { recursive: true });
};

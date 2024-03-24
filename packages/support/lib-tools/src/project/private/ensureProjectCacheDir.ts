import { mkdir } from 'fs/promises';
import { join } from 'path';

import { ProjectContext } from '@noodles-ui/support-types';

import { NUI_RESOURCES_DIR } from '../resources/constants';

export const ensureProjectCacheDir = async (project: ProjectContext): Promise<void> => {
    const file = join(project.projectPath, NUI_RESOURCES_DIR);
    await mkdir(file, { recursive: true });
};

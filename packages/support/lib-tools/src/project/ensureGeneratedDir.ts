import { mkdir } from 'fs/promises';
import { join } from 'path';

import { ProjectContext } from '../types/projects';

import { NUI_GENERATED_FOLDER } from './resources/constants';

export const ensureGeneratedDir = async (project: ProjectContext): Promise<void> => {
    const file = join(project.projectPath, NUI_GENERATED_FOLDER);
    await mkdir(file, { recursive: true });
};

import { mkdir } from 'fs/promises';
import { join } from 'path';

import { ProjectContext } from '@noodles-ui/support-types';

import { NUI_GENERATED_DIR } from '../../generate/constants';

export const ensureGeneratedDir = async (project: ProjectContext): Promise<void> => {
    const file = join(project.projectPath, NUI_GENERATED_DIR);
    await mkdir(file, { recursive: true });
};

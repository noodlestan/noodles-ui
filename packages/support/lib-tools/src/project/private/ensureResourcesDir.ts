import { mkdir } from 'fs/promises';
import { join } from 'path';

import { ProjectContext } from '@noodles-ui/support-types';

import { NUI_LIVE_TARGET_FOLDER } from '../../generate/constants';

export const ensureLiveDirs = async (project: ProjectContext): Promise<void> => {
    const file = join(project.projectPath, NUI_LIVE_TARGET_FOLDER);
    await mkdir(file, { recursive: true });
};

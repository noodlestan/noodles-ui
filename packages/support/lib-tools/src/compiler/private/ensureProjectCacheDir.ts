import { mkdir } from 'fs/promises';
import { join } from 'path';

import { CompilerContext } from '@noodles-ui/support-types';

import { NUI_RESOURCES_DIR } from '../resources/constants';

export const ensureProjectCacheDir = async (compiler: CompilerContext): Promise<void> => {
    const file = join(compiler.projectPath, NUI_RESOURCES_DIR);
    await mkdir(file, { recursive: true });
};

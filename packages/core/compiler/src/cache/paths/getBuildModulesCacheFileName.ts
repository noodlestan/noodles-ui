import { join } from 'path';

import { NUI_MODULES_CACHE_FILE, NUI_RESOURCES_DIR } from '../../resources/constants';
import { CompilerContext } from '../../types';

export const getBuildModulesCacheFileName = (compiler: CompilerContext): string => {
    return join(compiler.projectPath, NUI_RESOURCES_DIR, NUI_MODULES_CACHE_FILE);
};

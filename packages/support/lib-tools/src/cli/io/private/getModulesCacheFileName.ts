import { join } from 'path';

import { CompilerContext } from '@noodles-ui/support-types';

import { NUI_MODULES_CACHE_FILE, NUI_RESOURCES_DIR } from '../../../project/resources/constants';

export const getModulesCacheFileName = (compiler: CompilerContext): string => {
    return join(compiler.projectPath, NUI_RESOURCES_DIR, NUI_MODULES_CACHE_FILE);
};

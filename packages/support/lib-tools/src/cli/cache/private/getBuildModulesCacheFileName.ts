import { join } from 'path';

import { CompilerContext } from '@noodles-ui/support-types';

import { NUI_MODULES_CACHE_FILE, NUI_RESOURCES_DIR } from '../../../compiler/resources/constants';

export const getBuildModulesCacheFileName = (compiler: CompilerContext): string => {
    return join(compiler.projectPath, NUI_RESOURCES_DIR, NUI_MODULES_CACHE_FILE);
};

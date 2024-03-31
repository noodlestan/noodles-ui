import { join } from 'path';

import { NUI_RESOURCES_DIR, NUI_SNAPSHOT_FILE } from '../../resources/constants';
import { CompilerContext } from '../../types';

export const getBuildSnapshotFileName = (compiler: CompilerContext): string => {
    return join(compiler.projectPath, NUI_RESOURCES_DIR, NUI_SNAPSHOT_FILE);
};

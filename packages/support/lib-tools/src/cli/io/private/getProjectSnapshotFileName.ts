import { join } from 'path';

import { CompilerContext } from '@noodles-ui/support-types';

import { NUI_RESOURCES_DIR, NUI_SNAPSHOT_FILE } from '../../../project/resources/constants';

export const getProjectSnapshotFileName = (compiler: CompilerContext): string => {
    return join(compiler.projectPath, NUI_RESOURCES_DIR, NUI_SNAPSHOT_FILE);
};

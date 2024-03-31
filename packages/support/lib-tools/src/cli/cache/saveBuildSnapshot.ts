import { CompilerContext, saveBuildSnapshotFile } from '@noodles-ui/core-compiler';

import { formatFileNameRelativeToProject } from '../format/formatFileNameRelativeToProject';
import { logSuccess } from '../logger/logSuccess';

export const saveBuildSnapshot = async (compiler: CompilerContext): Promise<void> => {
    const fileName = await saveBuildSnapshotFile(compiler);

    logSuccess('Updated snapshot', formatFileNameRelativeToProject(compiler, fileName, true));
};

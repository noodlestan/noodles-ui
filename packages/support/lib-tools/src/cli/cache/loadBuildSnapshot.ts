import {
    CompilerContext,
    getBuildSnapshotFileName,
    loadBuildSnapshotFile,
} from '@noodles-ui/core-compiler';
import { deserializeSnapshot } from '@noodles-ui/core-compiler-types';

import { formatFileNameRelativeToProject } from '../format/formatFileNameRelativeToProject';
import { logSuccess } from '../logger/logSuccess';

export const loadBuildSnapshot = async (compiler: CompilerContext): Promise<void> => {
    const data = await loadBuildSnapshotFile(compiler);
    const { entities } = deserializeSnapshot(data);

    compiler.entities = entities;

    const fileName = getBuildSnapshotFileName(compiler);
    logSuccess(
        'Loaded project snapshot',
        formatFileNameRelativeToProject(compiler, fileName, true),
    );
};

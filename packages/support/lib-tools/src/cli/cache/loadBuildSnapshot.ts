import { CompilerContext } from '@noodles-ui/support-types';

import { formatFileNameRelativeToProject } from '../format/formatFileNameRelativeToProject';
import { logSuccess } from '../logger/logSuccess';

import { deserializeSnapshot } from './private/deserializeSnapshot';
import { getBuildSnapshotFileName } from './private/getBuildSnapshotFileName';
import { loadBuildSnapshotFile } from './private/loadBuildSnapshotFile';

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

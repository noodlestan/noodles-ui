import { CompilerContext } from '@noodles-ui/support-types';

import { formatFileNameRelativeToProject } from '../format/formatFileNameRelativeToProject';
import { logSuccess } from '../logger/logSuccess';

import { deserializeSnapshot } from './private/deserializeSnapshot';
import { getProjectSnapshotFileName } from './private/getProjectSnapshotFileName';
import { loadProjectSnapshotFile } from './private/loadProjectSnapshotFile';

export const loadProjectSnapshot = async (compiler: CompilerContext): Promise<void> => {
    const data = await loadProjectSnapshotFile(compiler);
    const { entities } = deserializeSnapshot(data);

    compiler.entities = entities;

    const fileName = getProjectSnapshotFileName(compiler);
    logSuccess(
        'Loaded project snapshot',
        formatFileNameRelativeToProject(compiler, fileName, true),
    );
};

import { writeFile } from 'fs/promises';

import { CompilerContext, serializeSnapshot } from '@noodles-ui/support-types';

import { formatFileNameRelativeToProject } from '../format/formatFileNameRelativeToProject';
import { logSuccess } from '../logger/logSuccess';

import { getBuildSnapshotFileName } from './private/getBuildSnapshotFileName';

export const saveBuildSnapshot = async (compiler: CompilerContext): Promise<void> => {
    const data = serializeSnapshot(compiler);
    const json = JSON.stringify(data);
    const fileName = getBuildSnapshotFileName(compiler);
    await writeFile(fileName, json);

    logSuccess('Updated snapshot', formatFileNameRelativeToProject(compiler, fileName, true));
};

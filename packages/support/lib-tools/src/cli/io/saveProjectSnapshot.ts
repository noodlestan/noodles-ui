import { writeFile } from 'fs/promises';

import { CompilerContext } from '@noodles-ui/support-types';

import { formatFileNameRelativeToProject } from '../format/formatFileNameRelativeToProject';
import { logSuccess } from '../logger/logSuccess';

import { getProjectSnapshotFileName } from './private/getProjectSnapshotFileName';
import { serializeSnapshot } from './private/serializeSnapshot';

export const saveProjectSnapshot = async (compiler: CompilerContext): Promise<void> => {
    const data = serializeSnapshot(compiler);
    const json = JSON.stringify(data);
    const fileName = getProjectSnapshotFileName(compiler);
    await writeFile(fileName, json);

    logSuccess('Updated snapshot', formatFileNameRelativeToProject(compiler, fileName, true));
};

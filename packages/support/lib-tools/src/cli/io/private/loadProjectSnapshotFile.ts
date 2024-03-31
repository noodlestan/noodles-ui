import { readFile } from 'fs/promises';

import { BuildSnapshotDto, CompilerContext } from '@noodles-ui/support-types';

import { getProjectSnapshotFileName } from './getProjectSnapshotFileName';

export const loadProjectSnapshotFile = async (
    compiler: CompilerContext,
): Promise<BuildSnapshotDto> => {
    const file = getProjectSnapshotFileName(compiler);
    const contents = await readFile(file);
    return JSON.parse(contents.toString()) as BuildSnapshotDto;
};

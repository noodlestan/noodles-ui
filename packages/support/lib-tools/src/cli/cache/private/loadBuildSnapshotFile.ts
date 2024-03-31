import { readFile } from 'fs/promises';

import { BuildSnapshotDto, CompilerContext } from '@noodles-ui/support-types';

import { getBuildSnapshotFileName } from './getBuildSnapshotFileName';

export const loadBuildSnapshotFile = async (
    compiler: CompilerContext,
): Promise<BuildSnapshotDto> => {
    const file = getBuildSnapshotFileName(compiler);
    const contents = await readFile(file);
    return JSON.parse(contents.toString()) as BuildSnapshotDto;
};

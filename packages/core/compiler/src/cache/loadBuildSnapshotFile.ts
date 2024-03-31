import { readFile } from 'fs/promises';

import { BuildSnapshotDto } from '@noodles-ui/core-compiler-types';

import { CompilerContext } from '../types';

import { getBuildSnapshotFileName } from './paths/getBuildSnapshotFileName';

export const loadBuildSnapshotFile = async (
    compiler: CompilerContext,
): Promise<BuildSnapshotDto> => {
    const fileName = getBuildSnapshotFileName(compiler);
    const contents = await readFile(fileName);
    return JSON.parse(contents.toString()) as BuildSnapshotDto;
};

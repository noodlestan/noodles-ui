import { writeFile } from 'fs/promises';

import { serializeSnapshot } from '@noodles-ui/core-compiler-types';

import { CompilerContext } from '../types';

import { getBuildSnapshotFileName } from './paths/getBuildSnapshotFileName';

export const saveBuildSnapshotFile = async (compiler: CompilerContext): Promise<string> => {
    const { entities, diagnostics } = compiler;
    const snapshot = {
        project: compiler.project,
        success: !!compiler.build.success,
        timestamp: compiler.build.timestamp,
        entities,
        diagnostics,
    };
    const data = serializeSnapshot(snapshot);
    const json = JSON.stringify(data);
    const fileName = getBuildSnapshotFileName(compiler);
    await writeFile(fileName, json);

    return fileName;
};

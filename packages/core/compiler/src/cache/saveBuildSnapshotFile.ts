import { writeFile } from 'fs/promises';

import { serializeSnapshot } from '@noodles-ui/core-compiler-types';
import { ProjectEntitiesMap } from '@noodles-ui/core-entities';

import { CompilerContext } from '../types';

import { getBuildSnapshotFileName } from './paths/getBuildSnapshotFileName';

const getSnapshotDependencies = (entities: ProjectEntitiesMap, exclude: string): string[] => {
    const names = Object.values(entities || {}).reduce((names, item) => {
        [...item.values()].forEach(item => names.add(item.entity.module));
        return names;
    }, new Set<string>());
    names.delete(exclude);
    return [...names.values()];
};

export const saveBuildSnapshotFile = async (compiler: CompilerContext): Promise<string> => {
    const { entities, diagnostics } = compiler;
    const snapshot = {
        project: compiler.project,
        success: !!compiler.build.success && !compiler.hasErrors(),
        timestamp: compiler.build.timestamp,
        entities,
        diagnostics,
        dependencies: getSnapshotDependencies(entities, compiler.project.module),
    };
    const data = serializeSnapshot(snapshot);
    const json = JSON.stringify(data);
    const fileName = getBuildSnapshotFileName(compiler);
    await writeFile(fileName, json);

    return fileName;
};

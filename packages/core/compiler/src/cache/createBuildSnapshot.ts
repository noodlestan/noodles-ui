import { BuildSnapshot } from '@noodles-ui/core-compiler-types';

import { CompilerContext } from '../types';

import { getSnapshotDependencies } from './saveBuildSnapshotFile';

export const createBuildSnapshot = (compiler: CompilerContext): BuildSnapshot => {
    const { entities, diagnostics } = compiler;
    const snapshot = {
        project: compiler.project,
        success: !!compiler.build.success && !compiler.hasErrors(),
        timestamp: compiler.build.timestamp,
        entities,
        diagnostics,
        dependencies: getSnapshotDependencies(entities, compiler.project.module),
    };
    return snapshot;
};

import { CompilerDiagnostics, ProjectEntities } from '../compiler';

export type BuildSnapshotAttributes = {
    success: boolean;
    timestamp: Date;
};

export type BuildSnapshot = BuildSnapshotAttributes & ProjectEntities & CompilerDiagnostics;

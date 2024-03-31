import { ProjectDiagnostics } from '@noodles-ui/core-diagnostics';
import { ProjectEntities } from '@noodles-ui/core-entities';

export type BuildSnapshotAttributes = {
    success: boolean;
    timestamp: Date;
};

export type BuildSnapshot = BuildSnapshotAttributes & ProjectEntities & ProjectDiagnostics;

import { ProjectDiagnostics } from '@noodles-ui/core-diagnostics';
import { ProjectEntities, ProjectEntity } from '@noodles-ui/core-entities';

export type BuildSnapshotAttributes = {
    project: ProjectEntity;
    success: boolean;
    timestamp: Date;
    dependencies: string[];
};

export type BuildSnapshot = BuildSnapshotAttributes & ProjectEntities & ProjectDiagnostics;

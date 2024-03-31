import { BuildSnapshotDto, ProjectBuildContextDto } from '@noodles-ui/support-types';

export const project = (snapshot?: BuildSnapshotDto): ProjectBuildContextDto =>
    snapshot?.entities.project[''] as ProjectBuildContextDto;

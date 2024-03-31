import { BuildSnapshotDto } from '@noodles-ui/core-compiler-types';

export type BuildStartedEvent = {
    timestamp: Date;
};
export type BuildFinishedEvent = BuildSnapshotDto;

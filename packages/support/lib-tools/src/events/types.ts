import { BuildSnapshotDto } from '@noodles-ui/support-types';

export type BuildStartedEvent = {
    timestamp: Date;
};
export type BuildFinishedEvent = BuildSnapshotDto;

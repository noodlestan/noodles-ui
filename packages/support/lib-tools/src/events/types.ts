import { ProjectSnapshot } from '@noodles-ui/support-types';

export type BuildStartedEvent = {
    timestamp: Date;
};
export type BuildFinishedEvent = {
    success: boolean;
    timestamp: Date;
    snapshot: ProjectSnapshot;
};

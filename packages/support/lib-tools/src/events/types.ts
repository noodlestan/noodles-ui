import { ProjectSnapshot } from '../types/projects';

export type BuildStartedEvent = {
    timestamp: Date;
};
export type BuildFinishedEvent = {
    success: boolean;
    timestamp: Date;
    snapshot: ProjectSnapshot;
};

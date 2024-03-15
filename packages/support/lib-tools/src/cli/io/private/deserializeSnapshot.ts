import { BuildSnapshotDto } from '@noodles-ui/support-types';

export const deseralizeSnapshot = (contents: Buffer): BuildSnapshotDto => {
    return JSON.parse(contents.toString()) as BuildSnapshotDto;
};

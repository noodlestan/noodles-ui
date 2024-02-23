import Queue from 'better-queue';

// https://github.com/diamondio/better-queue/issues/55
export type QueueSized = Queue & {
    length: number;
};

export { build } from './api/build';
export { watch } from './api/watch';

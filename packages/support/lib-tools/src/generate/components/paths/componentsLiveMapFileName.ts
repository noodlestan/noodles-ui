import { join } from 'path';

export const componentsLiveMapFileName = (target: string): string => {
    return join(target, `components/live.map.ts`);
};

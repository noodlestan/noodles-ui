import { join } from 'path';

export const systemIndexFileName = (target: string): string => {
    return join(target, `system.ts`);
};

import { join } from 'path';

export const componentIndexFileName = (target: string): string => {
    return join(target, `/components/index.ts`);
};

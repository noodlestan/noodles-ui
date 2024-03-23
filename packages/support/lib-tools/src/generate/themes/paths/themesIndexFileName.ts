import { join } from 'path';

export const themesIndexFileName = (target: string): string => {
    return join(target, `/themes/index.tsx`);
};

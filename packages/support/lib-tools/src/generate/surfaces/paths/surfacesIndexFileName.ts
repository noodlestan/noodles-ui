import { join } from 'path';

export const surfacesIndexFileName = (target: string): string => {
    return join(target, `/surfaces/index.tsx`);
};

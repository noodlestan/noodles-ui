import { join } from 'path';

export const surfacesFileName = (target: string): string => {
    return join(target, `/surfaces/index.tsx`);
};

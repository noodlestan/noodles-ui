import { join } from 'path';

export const systemRootFileName = (target: string): string => {
    return join(target, `/UIRoot.tsx`);
};

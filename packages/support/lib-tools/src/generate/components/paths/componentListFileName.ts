import { join } from 'path';

export const componentListFileName = (target: string): string => {
    return join(target, `components.ts`);
};

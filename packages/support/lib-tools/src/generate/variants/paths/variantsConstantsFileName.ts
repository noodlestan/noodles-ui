import { join } from 'path';

export const variantsConstantsFileName = (target: string): string => {
    return join(target, `/variants/variants.constants.ts`);
};

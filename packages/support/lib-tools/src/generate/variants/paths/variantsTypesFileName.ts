import { join } from 'path';

export const variantsTypesFileName = (target: string): string => {
    return join(target, `/variants/variants.types.ts`);
};

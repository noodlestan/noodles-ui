import { join } from 'path';

export const variantsScssFileName = (target: string): string => {
    return join(target, `/variants/variants.scss`);
};

import { join } from 'path';

export const systemGlobalsScssFileName = (target: string): string => {
    return join(target, `/styles/globals.scss`);
};

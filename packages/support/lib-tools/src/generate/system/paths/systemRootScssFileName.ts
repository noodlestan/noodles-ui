import { join } from 'path';

export const systemRootScssFileName = (target: string): string => {
    return join(target, `/UIRoot.scss`);
};

import { dirname } from 'path';
import { relative } from 'path/posix';

import { removeExtension } from './removeExtension';

export const relativePath = (fromFile: string, toFile: string, noExtenstion?: boolean): string => {
    const target = noExtenstion ? removeExtension(toFile) : toFile;
    const rel = relative(dirname(fromFile), target);
    return !rel.startsWith('.') ? `./${rel}` : rel;
};

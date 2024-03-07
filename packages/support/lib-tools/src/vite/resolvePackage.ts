import { resolve } from 'path';

import { findPackagePath } from './private/findPackage';

export const resolvePackage = (module: string): string => {
    const packagePath = findPackagePath(resolve('.'), module);
    if (!packagePath) {
        throw new Error(`Could not find module "${module}"`);
    }
    return packagePath;
};

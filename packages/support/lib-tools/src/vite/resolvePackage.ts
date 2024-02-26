import { resolve } from 'path';

import { findPackagePath } from './private/findPackage';

export const resolvePackage = (module: string): unknown => {
    const packagePath = findPackagePath(resolve('.'), module);
    if (!packagePath) {
        throw new Error(`Can not find  module "${module}"`);
    }
    return packagePath;
};

import { existsSync } from 'fs';
import { dirname, join } from 'path';

import { NUI_WORKSPACE_FILE } from '../project/resources/constants';

const findRoot = (path: string): string | undefined => {
    if (!existsSync(path)) {
        return undefined;
    }
    const rootFile = join(path, NUI_WORKSPACE_FILE);
    if (existsSync(rootFile)) {
        return path;
    } else if (dirname(path) === path) {
        return undefined;
    } else {
        return findRoot(dirname(path));
    }
};

export const findRootPath = (projectPath: string): string | undefined => {
    return findRoot(projectPath);
};

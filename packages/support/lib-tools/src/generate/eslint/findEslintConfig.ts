import { readdirSync, statSync } from 'fs';
import { dirname, join } from 'path';

import { ProjectContext } from '@noodles-ui/support-types';

export const findEslintConfig = async (
    project: ProjectContext,
    startDir: string,
): Promise<string[]> => {
    const possibleConfigs = ['.eslintrc', '.eslintrc.js', '.eslintrc.cjs', '.eslintrc.json'];
    const foundConfigs: string[] = [];

    function search(dir: string) {
        const files = readdirSync(dir);
        for (const file of files) {
            const filePath = join(dir, file);
            const stat = statSync(filePath);
            if (!stat.isDirectory()) {
                if (possibleConfigs.includes(file)) {
                    foundConfigs.push(filePath);
                }
            }
        }
        if (dirname(dir).includes(project.rootPath || project.projectPath)) {
            search(dirname(dir));
        }
    }

    search(startDir);
    return foundConfigs;
};
